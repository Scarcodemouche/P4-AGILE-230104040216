import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { randomUUID } from 'node:crypto';
import {
  httpLogger,
  correlationId,
  requireBearer,
  validateSchema,
  CreateOrderSchema,
  errorHandler
} from '../../../utils';

const app = express();
/**1. CORRELATION ID dulu (agar ada walaupun JSON rusak) */
app.use(correlationId);
/**2. Security headers + Security logging */
app.use(helmet());
app.use(httpLogger);
/**JSON parser + Handler khusus parse error (500 + 400 BAD_JSON) */
app.use(express.json({ limit: '100kb' }));

const jsonParseErrorHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err?.type === 'entity.parse.failed' || err?.status === 400) {
    return res
      .status(400)
      .json({ message: 'Invalid JSON', code: 'BAD_JSON' });
  }

  return next(err);
};


app.use(jsonParseErrorHandler);
/**4. AUTH + Rate limit  */
app.use(requireBearer);
app.use(rateLimit({ windowMs: 60_000, max: 60, standardHeaders: true, legacyHeaders: false}));
/**5. Routes */
const orders: any[] = [];
app.post('/orders', validateSchema(CreateOrderSchema), (req, res) => {
  const { productId, quantity } = (req as any).validatedBody;
  const order = { id: randomUUID(), productId, quantity, createdAt: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});
/**6.Error Handler terakhir */
app.use(errorHandler);

export default app;