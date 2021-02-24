import 'reflect-metadata';
import express, { request } from 'express';
import "./database";
const app = express();

/**
 * MÉTODOS HTTP
 * GET => Busca
 * POST => Salvar 
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração específica (apenas 1 info)
 */

app.get('/', (request, response) => {
  return response.json({ message: "Hello World - NLW04" });
});

// 1 param => Rota(Recurso API)
// 1 param => request, response

app.post("/", (request, response) => {
  return response.json({ message: "Os dados foram salvos com sucesso!"});
});

app.listen(3333, () => console.log("Server is running!"));
