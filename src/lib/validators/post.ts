import {z} from "zod"

export const PostValidator = z.object({
    title: z
        .string()
        .min(3, {message: "Title must be longer than 3 character"})
        .max(128, {message: "Title must not have more than 128 character"}),
    subredditId: z.string(),
    content:z.any(),

})

export type PostCreationRequest = z.infer<typeof PostValidator>