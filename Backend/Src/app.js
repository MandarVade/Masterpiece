import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", 
    credentials: true,
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World", status: "Server is running!" });
});
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import router from "./Routes/user.routes.js";
app.use("/users", router);


export { app };