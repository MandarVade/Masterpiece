import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/auth.routes.js";
import productRouter from "./Routes/product.routes.js";
import cartRouter from "./Routes/cart.routes.js";
import orderRouter from "./Routes/order.routes.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));

app.get("/", (req, res) => {
    res.json({ message: "Hello World", status: "Server is running!" });
});
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);


export { app };