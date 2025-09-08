import { FastifyReply, FastifyRequest } from 'fastify';

export function checkSessionIdExists(
  req: FastifyRequest,
  rep: FastifyReply,
  done: () => void
) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return rep.status(401).send({ error: 'Unauthorized' });
  }

  done();
}
