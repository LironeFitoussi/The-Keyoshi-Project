import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

// Routes imports 
import bookRouter from './routes/book.routes'
import chapterRouter from './routes/chapter.routes'
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'

const app = express()

app.use(morgan('dev'))

// Middlewares
app.use(express.json())

// Allow all origins
app.use(cors({ credentials: true }))

// API routes - place these before static file handling
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/chapters', chapterRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

// Serve static files from Client/dist
const clientDistPath = path.join(__dirname, '../../Client/dist')
app.use(express.static(clientDistPath))

// Catch-all handler for client-side routing
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  } else {
    next()
  }
})

export default app


