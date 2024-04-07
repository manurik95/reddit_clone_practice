// Vorrechnen, wenn man auf eine Seite klickt.

import { VoteType } from "@prisma/client"

// Damit das vorgeladen ist.
export type CachedPost = {
  id: string
  title: string
  authorUsername: string
  content: string
  currentVote: VoteType | null
  createdAt: Date
}