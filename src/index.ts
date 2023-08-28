import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/cursos", async (req, res) => {
  const todos = await prisma.curso.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(todos);
});

app.post("/cursos", async (req, res) => {
  const todo = await prisma.curso.create({
    data: {
      createdAt: new Date(),
      curso: req.body.curso ?? "Empty curso",
      categoria: req.body.categoria ?? "Empty category",
    },
  });

  return res.json(todo);
});

app.get("/cursos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.curso.findUnique({
    where: { id: Number(id)  },
  });

  return res.json(todo);
});

app.put("/cursos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.curso.update({
    where: { id: Number(id) },
    data: {
      curso: req.body.curso,
      categoria: req.body.categoria,
    },
  });

  return res.json(todo);
});

app.delete("/cursos/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.curso.delete({
    where: { id: Number(id)  },
  });

  return res.send({ status: "ok" });
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Cursos REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /cursos
    GET, PUT, DELETE /cursos/:id
  </pre>
  `.trim(),
  );
});

app.listen(Number(port), "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
