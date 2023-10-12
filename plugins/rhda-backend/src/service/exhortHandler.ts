import {Request, Response} from 'express';
import { getRootLogger } from '@backstage/backend-common';
import childProcess from 'node:child_process';
import * as fs from "fs";

export const rhdaHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    const clone = require('git-clone/promise');
    const repo = `https://github.com/${req.query.repositorySlug}.git`
    // TODO: make this path unique to avoid conflict. implement hashing.
    const gitSourceDir = `./git-source`;
    // delete the folder if it exists already.
    fs.rmSync(gitSourceDir, { recursive: true, force: true });

    const  pomFileDirectory = `${gitSourceDir}/${req.query.manifestFilePath}`
    const execCommand = `NODE_NO_WARNINGS=1 exhort-javascript-api stack ${pomFileDirectory} --summary`;

    clone(repo, gitSourceDir).then(async () => {
        logger.info(`cloned the repo=[${repo}] successfully to: ${gitSourceDir}`);
        childProcess.exec(execCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                logger.error(`FAILED to RUN the scan on the repo=[${repo}] to ${gitSourceDir}, with error=${stderr}`);
                console.log(`stderr: ${stderr}`);
                return;
            }
            res.json(JSON.parse(stdout));
        })
    }).catch((error:any) => {
        logger.error(`FAILED to clone the repo=[${repo}] to ${gitSourceDir}, with error=${error}`);
    });
};

export const healthHandler = (req: Request, res: Response) => {
    const logger = getRootLogger();
    logger.info('PONG!');
    res.json({ status: 'ok' });
};




