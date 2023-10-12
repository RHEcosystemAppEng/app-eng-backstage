import { Request, Response } from 'express';
import { getRootLogger } from '@backstage/backend-common';

export const scanResult = {"critical":10,"high":20,"medium":30,"low":3};

export const rhdaHandler = (req: Request, res: Response) => {
    return res.json(scanResult);
};

export const healthHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    logger.info('PONG!');
    res.json({ status: 'ok' });
};




