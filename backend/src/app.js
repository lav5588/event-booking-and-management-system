import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({ origin:Boolean(process.env.CORS_ORIGIN) , credentials: true }));
app.use(express.json(/*{limit: "16kb"}*/))
app.use(express.urlencoded({extended: false/*, limit: "16kb"*/}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'
import blogsRouter from './routes/blogs.routes.js'
import bookingRouter from './routes/booking.routes.js'
import favoritesRouter from "./routes/favoriteEvents.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/events", eventRouter)
app.use("/api/v1/blogs", blogsRouter)
app.use("/api/v1/bookings", bookingRouter)
app.use("/api/v1/favorites", favoritesRouter)
// http://localhost:8000/api/v1/users/register

export { app }