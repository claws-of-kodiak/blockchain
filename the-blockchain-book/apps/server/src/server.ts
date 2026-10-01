import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import courseRouter from "./routes/course";
import { handleErrors } from "./middleware/middleware";
import userRouter from "./routes/user";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Server Routes
app.use("/course", courseRouter);
app.use("/auth", authRouter);
app.use("/progress", userRouter);

app.get("/", (req, res) => {
  res.send(`You made a GET request to port: ${port}`);
});

app.use(handleErrors);

app.listen(port, () => console.log("Server is live at port ", port));
