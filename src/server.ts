import fastify from 'fastify';
import { knex } from './database';

const app = fastify();

// GET, POST, PUT, DELETE, PATCH

app.get('/hello', async () => {
  const test = await knex('sqlite_schema').select('*');
  console.log(test);
  return { message: 'Hello World' };
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running on http://localhost:3333');
});
