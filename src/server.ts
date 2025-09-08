import fastify from 'fastify';
import { knex } from './database';
import { env } from './env/index';
import { transactionsRoutes } from './routes/transaction';
import cookie from '@fastify/cookie';

const app = fastify();

app.addHook('preHandler', async (req, rep) => {
  console.log(`[${req.method}] ${req.url}`);
});

app.register(cookie);

//order matters
// //every route with prefix /transactions
app.register(transactionsRoutes, {
  prefix: '/transactions',
});

// GET, POST, PUT, DELETE, PATCH

app.get('/hello', async () => {
  /*const test = await knex('sqlite_schema').select('*');
  console.log(test);
  return { message: 'Hello World' };*/

  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'transação de teste',
      amount: 1000,
    })
    .returning('*');

  const transaction2 = await knex('transactions')
    .where('amount', 1000)
    .select('*');

  console.log(transaction2);
  return transaction;
});

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server running on http://localhost:3333');
});
