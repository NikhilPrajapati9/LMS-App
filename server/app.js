import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


//routes
import healthCheckRoute from "./routes/healthcheck.routes.js"
import authRoutes from "./routes/user.routes.js"




app.use("/api/v1/user", authRoutes);
app.use("/api/v1/healthcheck", healthCheckRoute)





export { app }