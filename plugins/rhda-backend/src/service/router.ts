import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import {healthHandler, rhdaHandler, rhdaHtmlHandler} from "./exhortHandler";


export interface RouterOptions {
  logger: Logger;
}


export async function createRouter(
    options: RouterOptions,
): Promise<express.Router> {

  const router = Router();
  router.use(express.json());

  router.get('/health', healthHandler);
  router.get('/rhda-analysis', rhdaHandler);
  router.get('/rhda-html-analysis', rhdaHtmlHandler);
  router.use(errorHandler());
  return router;
}
