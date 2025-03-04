import { getAuthSession } from "@/lib/auth";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try{
    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status:401})
    }

    const body = await req.json() // in next so Zugriff auf Body
    const {name} = SubredditValidator.parse(body)

    const subredditExists = await db.subreddit.findFirst({
      where: {
        name,
      }
    })

    if(subredditExists) {
      return new Response('Subreddit already exists', {status: 409}) // same name conflict
    }
    // ansonsten neues subreddit
    const subreddit= await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      }
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      }
    })

    return new Response(subreddit.name)

  } catch (err) {
    // Error handling
    if(err instanceof z.ZodError) {
      return new Response(err.message, {status:422})
    }
    return new Response("Could not create subreddit", {status:500})
  }
}