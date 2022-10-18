import type { Request, Response } from 'express'
import type { RowDataPacket } from 'mysql2'
import type { GetAllTaskSchema } from '@/schemas'
import type { Task } from '@/types'

import { db } from '@/database'

type GetAllTaskResponse = { results: Task[] }

export const getAllTask = async (req: Request, res: Response<GetAllTaskResponse>) => {
  const { userId: id } = req.body as GetAllTaskSchema['body']

  const tasksResult = await db.query<RowDataPacket[]>(
    'SELECT id, title, description, completed FROM tasks WHERE user_id = ?',
    [id],
  )

  return res.status(200).json({ results: tasksResult[0] as Task[] })
}
