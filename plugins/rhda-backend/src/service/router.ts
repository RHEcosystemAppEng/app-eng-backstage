import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';


export interface RouterOptions {
  logger: Logger;
}

export const scanResult = {"vulnerabilities":{"critical":10,"high":20,"medium":30,"low":3}};


export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    console.log("in rhda backend - /health");
    response.json({ status: 'ok' });
  });

  router.get('/rhda-analysis', (_, response) => {
    logger.info('/rhda-analysis!');
   /* const clone = require('git-clone/promise');
    const repo = 'git@github.com:huoqishi/x-html.git'
    clone(repo, './test').then(() => {
      console.log('ok')
   })*/
    // in reality we need to run the scan and get results.
    response.json(scanResult.vulnerabilities);
  });

  router.use(errorHandler());
  return router;
}
