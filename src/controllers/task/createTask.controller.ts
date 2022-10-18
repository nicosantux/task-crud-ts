import type { Request, Response } from 'express'
import type { CreateTaskSchema } from '@/schemas'
import type { Task } from '@/types'
import type { ResultSetHeader } from 'mysql2'

import { db } from '@/database'

type CreateTaskResponse = { status: 'failed'; error: string } | { status: 'success'; task: Task }

export const createTask = async (req: Request, res: Response<CreateTaskResponse>) => {
  const { userId, title, description } = req.body as CreateTaskSchema['body']

  const newTask = { title, description, user_id: userId }

  const [createdTask] = await db.query<ResultSetHeader>('INSERT INTO tasks SET ?', [newTask])

  if (!createdTask.affectedRows) {
    return res.status(500).json({ status: 'failed', error: 'Internal server error' })
  }

  return res.status(201).json({
    status: 'success',
    task: { id: createdTask.insertId, completed: false, userId, title, description },
  })
}
