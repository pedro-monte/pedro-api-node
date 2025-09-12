import { test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app'; // sem listen
import { before } from 'node:test';

//3 variaveis
//enunciado -> proposta
//operação -> como fazer http chamada
//validação -> resultado esperado

//supertest -> rodar os testes sem colocar a aplicação no ar

test('Teste', () => {
  // Example test case

  const responseStatusCode = 201;

  expect(responseStatusCode).toEqual(201);
});

beforeAll(async () => {
  await app.ready(); //espera o fastify ficar totalmente pronto
});

afterAll(async () => {
  await app.close(); //fecha a aplicação -> remove ela da memória
});

test('Usuário consegue criar uma nova transação', async () => {
  await request(app.server) // Server puro
    .post('/transactions') //Falha porque os plugins são assincronos
    .send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201);

  //OU
  /*
      const response = await request(app.server) // Server puro
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
      expect(response.statusCode).toEqual(201);
    */
});
