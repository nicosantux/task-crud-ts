import { Router } from 'express'

import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from '@/controllers'
import { jwtValidator, schemaValidator } from '@/middlewares'
import { createTaskSchema, deleteTaskSchema, getAllTaskSchema, getTaskByIdSchema } from '@/schemas'

const router = Router()

router.get('/tasks', [jwtValidator, schemaValidator(getAllTaskSchema)], getAllTask)

router.get('/task/:id', [jwtValidator, schemaValidator(getTaskByIdSchema)], getTaskById)

router.post('/task', [jwtValidator, schemaValidator(createTaskSchema)], createTask)

router.put('/task/:id', [jwtValidator, schemaValidator(getTaskByIdSchema)], updateTask)

router.delete('/task/:id', [jwtValidator, schemaValidator(deleteTaskSchema)], deleteTask)

export { router as taskRouter }
