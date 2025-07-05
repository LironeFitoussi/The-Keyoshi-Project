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

// Determine static files path based on environment
const staticPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '../client-dist')
  : path.join(__dirname, '../../Client/dist')

// Cache control for static assets
app.use((req, res, next) => {
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  }
  next();
});

// Serve static files
app.use(express.static(staticPath))

// Catch-all handler for client-side routing
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(staticPath, 'index.html'))
  } else {
    next()
  }
})

export default app


