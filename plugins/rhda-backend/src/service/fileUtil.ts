import fs from "fs";
import {getRootLogger} from "@backstage/backend-common";


export const deleteFolderIfItExists = (folderPath:string) => {
    if(fs.existsSync(folderPath)){
        getRootLogger().debug(`deleting the folder ${folderPath}`);
        fs.rmSync(folderPath, {recursive:true, force: true});
    }
}

export const recreateFolder = (folderPath:string) => {
    deleteFolderIfItExists(folderPath);
    fs.mkdirSync(folderPath);
}