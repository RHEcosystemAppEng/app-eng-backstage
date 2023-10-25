import { useEntity } from '@backstage/plugin-catalog-react';
import {ResponseErrorPanel} from "@backstage/core-components";
import React from "react";

const PROJECT_REPO_ANNOTATION = 'github.com/project-slug';
const MANIFEST_FILE_ANNOTATION = 'rhda/manifest-file-path';

export const useRhdaAppData = () => {
    const { entity } = useEntity();
    const repositorySlug =
        entity?.metadata.annotations?.[PROJECT_REPO_ANNOTATION] ?? '';

    const manifestFilePath =
        entity?.metadata.annotations?.[MANIFEST_FILE_ANNOTATION] ?? '';

    let error;
    if(!repositorySlug){
        error = {"message":"RHDA: Missing 'github.com/project-slug' annotation in catalog-info.yaml.", "name":"Missing annotation project-slug"};
    }

    if(!manifestFilePath){
        error = {"message":"RHDA : Missing 'rhda/manifest-file-path' annotation in catalog-info.yaml", "name":"Missing annotation manifest-file-path"};
    }
    return { repositorySlug, manifestFilePath, error };
};
