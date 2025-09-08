import { FastifyInstance } from 'fastify';
import crypto from 'node:crypto';
import { z } from 'zod';
import { knex } from '../database';
import { env } from '../env/index';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

//must be async
export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req, rep) => {
      const { sessionId } = req.cookies;

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*');

      return { transactions };
    }
  );

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies;
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first();

      return { summary };
    }
  );

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (req) => {
      const { sessionId } = req.cookies;
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(req.params);

      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first();

      return { transaction };
    }
  );

  app.post('/', async (req, rep) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      rep.cookie('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      type,
      session_id: sessionId,
    });

    return rep.status(201).send();
  });
}
