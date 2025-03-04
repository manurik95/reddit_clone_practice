import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubsriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if(!session?.user) {
      return new Response("Unauthorized", {status:401})
    }

    const body = await req.json()

    const {subredditId} = SubredditSubsriptionValidator.parse(body)
  
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    })

    if(!subscriptionExists) {
      return new Response("You are not subscribed to this subreddit.", {
        status:400,
      })
    }

    // check if user is the creator of the subreddit
    const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
        creatorId: session.user.id
      }
    })

    if(subreddit) {
      return new Response("You cant unsubscribe from your own subreddit",
      {status: 400})
    }

    await db.subscription.delete({
      where: {
        userId_subredditId: {
            subredditId,
            userId: session.user.id,
        }
      }
    })

    // Nachrciht wenn erfolgreich subscribed
    return new Response(subredditId)


} catch (err) {
    // Error handling
    if(err instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status:422})
    }
    return new Response("Could not unsubscribe, try later", {status:500})
  }
}