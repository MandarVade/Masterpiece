import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", 
    credentials: true,
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World", status: "Server is running!" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: "Something went wrong!", 
        error: process.env.NODE_ENV === 'development' ? err.message : {} 
    });
});


export { app };