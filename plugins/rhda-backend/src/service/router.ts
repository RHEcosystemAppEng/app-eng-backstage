import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import exhort from '@RHEcosystemAppEng/exhort-javascript-api'


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
    const clone = require('git-clone/promise');
    const repo = 'https://github.com/lokeshrangineni/stonesoup-java-pipeline-example-with-crda.git'
    const folderName = "test-folder";
    const targetPathDir = `/Users/lrangine/Documents/Src/appeng-backstage/${folderName}`;
    clone(repo, targetPathDir).then(async () => {
      logger.info(`cloned the repo=[${repo}] successfully ${targetPathDir}`);
      // Get stack analysis in JSON format
      // Get component analysis in JSON format
      // Get stack analysis in JSON format
      const stackAnalysis = await exhort.stackAnalysis('/path/to/pom.xml');
      console.log("stackAnalysis", stackAnalysis);
    }).catch((error:any) => {
      logger.error(`FAILED to clone the repo=[${repo}] to ${targetPathDir}, with error=${error}`);
    });

    // in reality we need to run the scan and get results.
    response.json(scanResult.vulnerabilities);
  });

  /* function hashCode(s:string) {
    return s.split("").reduce(function(a, b) {
      const result = ((a << 5) - a) + b.charCodeAt(0);
      return result & result;
    }, 0);
  }*/

  router.use(errorHandler());
  return router;
}
