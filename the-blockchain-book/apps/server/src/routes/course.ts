import express from "express";

const courseRouter = express.Router();

courseRouter.get("/unlockStep", (req, res) => {
  console.log("Recieved request to course/unlockStep", req);
  res.status(200).json({ message: "You have unlocked the next step." });
});

export default courseRouter;
