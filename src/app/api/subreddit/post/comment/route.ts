import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { CommentValidator } from "@/lib/validators/comments"
import { z } from "zod"

export async function PATCH(req: Request) {
    
    try {
        const body = await req.json()
        const {postId, text, replyToId} = CommentValidator.parse(body)
        const session = await getAuthSession()

        if(!session?.user) {
          return new Response('Unauthorized', {status:401})
        }

        await db.comment.create({
            data: {
                text, 
                postId,
                authorId: session.user.id,
                replyToId,
            },
        })

        return new Response("Ok")

    } catch (error) {
        if (error instanceof z.ZodError) {
          return new Response(error.message, { status: 400 })
        }
    
        return new Response(
          'Could not post Comment, try later',
          { status: 500 }
        )
      }
}