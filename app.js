import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import router from "./routes/api.js";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./src/config/config.js";


const app = express();


// App Use Default Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet())
app.use(cookieParser());
app.use(fileUpload());

// App Use Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER })
app.use(limiter)


// Cache
app.set('etag', WEB_CACHE)


// Database Connect
mongoose.connect(DATABASE, { autoIndex: true }).then(() => {
    console.log("MongoDB connected");
}).catch(() => {
    console.log("MongoDB disconnected");
})



app.use("/api", router)


app.listen(PORT, () => {
    console.log("Server run successfully " + PORT)
})






