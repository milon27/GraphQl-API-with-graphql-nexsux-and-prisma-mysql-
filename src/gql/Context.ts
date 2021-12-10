import { PrismaClient } from '.prisma/client'
import { Request, Response } from 'express'

export type iContext = {
    prisma: PrismaClient
    req: Request
    res: Response
    id: number
}