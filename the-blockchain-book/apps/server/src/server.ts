import express from "express";
import cors from "cors";
import courseRouter from "./routes/course";
import authRouter from "./routes/auth";

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

app.get("/", (req, res) => {
  res.send(`You made a GET request to port: ${port}`);
});

app.listen(port, () => console.log("Server is live at port ", port));
