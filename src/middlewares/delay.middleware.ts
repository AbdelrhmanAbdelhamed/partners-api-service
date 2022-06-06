import { Request, Response, NextFunction } from 'express';
import { sleep } from '../utils';

export async function delayMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const delayInMs = Number(process.env.DELAY_MIDDLEWARE_MS);

  console.log(`Adding delay for ${delayInMs} ms before respond...`);
  await sleep(delayInMs);
  console.log(`Responding...`);

  next();
}
