import {Request, Response} from 'express';
import { getRootLogger } from '@backstage/backend-common';
import childProcess from 'node:child_process';
import * as clone from 'git-clone/promise';
import * as crypto from "crypto";
import { recreateFolder, deleteFolderIfItExists } from './fileUtil';

export const rhdaHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    const repo = `https://github.com/${req.query.repositorySlug}.git`
    const gitSourceDir = `./git-source/${crypto.randomBytes(20).toString('hex')}`;
    recreateFolder(gitSourceDir);
    clone(repo, gitSourceDir).then(async () => {
        logger.info(`cloned the repo=[${repo}] successfully to: ${gitSourceDir}`);
        const  pomFileDirectory = `${gitSourceDir}/${req.query.manifestFilePath}`
        const execCommand = `NODE_NO_WARNINGS=1 exhort-javascript-api stack ${pomFileDirectory} --summary`;
        childProcess.exec(execCommand, (error, stdout, stderr) => {
            if (error) {
                logger.error(`error: ${error.message}`);
                throw error;
            }
            if (stderr) {
                const errorMessage = `FAILED to RUN the scan on the repo=[${repo}] to ${gitSourceDir}, with error=${stderr}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
            // delete the folder after the report.
            deleteFolderIfItExists(gitSourceDir)
            res.json(JSON.parse(stdout));
        })
    }).catch((error:any) => {
        logger.error(`FAILED to clone the repo=[${repo}] to ${gitSourceDir}, with error=${error}`);
        // delete the folder after exception.
        deleteFolderIfItExists(gitSourceDir)
        throw error;
    });
};


export const rhdaHtmlHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    const repo = `https://github.com/${req.query.repositorySlug}.git`
    const gitSourceDir = `./git-source/${crypto.randomBytes(20).toString('hex')}`;
    recreateFolder(gitSourceDir);
    clone(repo, gitSourceDir).then(async () => {
        logger.info(`cloned the repo=[${repo}] successfully to: ${gitSourceDir}`);
        const  pomFileDirectory = `${gitSourceDir}/${req.query.manifestFilePath}`
        const htmlResponsePath = "/tmp/htmlResponse.html"
        const execCommand = `NODE_NO_WARNINGS=1 exhort-javascript-api stack ${pomFileDirectory} --html > ${htmlResponsePath}`;
        childProcess.exec(execCommand, {maxBuffer: 1024 * 1500},(error, stdout, stderr) => {
            if (error) {
                logger.error(`error: ${error.message}`);
                throw error;
            }
            if (stderr) {
                const errorMessage = `FAILED to RUN the scan on the repo=[${repo}] to ${gitSourceDir}, with error=${stderr}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
            res.setHeader('Content-disposition', 'attachment; filename=RHDA-generated-html-report.html');
            logger.info("html response is generated to the file on server. Going to send the response.");
            // delete the folder after the report.
            deleteFolderIfItExists(gitSourceDir)
            res.download(`${htmlResponsePath}`);
        })
    }).catch((error:any) => {
        logger.error(`FAILED to clone the repo=[${repo}] to ${gitSourceDir}, with error=${error}`);
        // delete the folder after the report.
        deleteFolderIfItExists(gitSourceDir)
        throw error;
    });
};

export const healthHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    logger.info('PONG!');
    res.json({ status: 'ok' });
};




