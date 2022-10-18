import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'module-alias/register'

import { authRouter, taskRouter } from '@/routes'

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 4000

app.use(cors())

app.use(express.json())

app.use(authRouter)
app.use(taskRouter)

app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})
