import express from "express";
import prisma from "./config/prisma";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/users/add", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  res.json({
    user,
  });
});

app.get("/users/get", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on ${process.env.PORT}`);
});
