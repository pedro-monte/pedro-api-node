import { app } from './app';
import { env } from './env/index';

//porta 3333 -> padrão
//porta 80 -> http
//porta 443 -> https

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server running on http://localhost:${env.PORT}`);
});
