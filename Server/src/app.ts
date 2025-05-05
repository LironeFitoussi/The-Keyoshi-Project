import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Routes imports 
import bookRouter from './routes/book.routes'
import chapterRouter from './routes/chapter.routes'
const app = express()

app.use(morgan('dev'))
app.use(express.json())

// Allow all origins
app.use(cors({ credentials: true }))

// Test route
app.get('/', (req, res) => {
  res.send('API is running')
})

// function fakeLongOperationMiddleware() {
//   return (req: Request, res: Response, next: NextFunction) => {
//     setTimeout(() => {
//       next()
//     }, 1000)  
//   }
// }

// Routes
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/chapters', chapterRouter)

export default app


