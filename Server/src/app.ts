import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

// Routes imports 
import bookRouter from './routes/book.routes'
import chapterRouter from './routes/chapter.routes'
const app = express()

app.use(morgan('dev'))
app.use(express.json())

// Allow all origins
app.use(cors({ credentials: true }))

// API routes - place these before static file handling
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/chapters', chapterRouter)

// Determine the correct path for serving static files
const clientDistPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../client-dist') // Production path
  : path.join(__dirname, '../../Client/dist') // Development path

// Serve static files from the React/Vite app build directory
app.use(express.static(clientDistPath))

// Handle React routing by serving index.html for any non-API routes
app.get('/', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  } else {
    next()
  }
})

export default app


