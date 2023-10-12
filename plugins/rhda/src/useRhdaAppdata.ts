import { useEntity } from '@backstage/plugin-catalog-react';

const PROJECT_REPO_ANNOTATION = 'github.com/project-slug';
const MANIFEST_FILE_ANNOTATION = 'rhda/manifest-file-path';

export const useRhdaAppData = () => {
    const { entity } = useEntity();
    const repositorySlug =
        entity?.metadata.annotations?.[PROJECT_REPO_ANNOTATION] ?? '';

    if (!repositorySlug) {
        throw new Error(` ${PROJECT_REPO_ANNOTATION} annotations are missing`);
    }

    const manifestFilePath =
        entity?.metadata.annotations?.[MANIFEST_FILE_ANNOTATION] ?? '';

    if (!manifestFilePath) {
        throw new Error(` ${PROJECT_REPO_ANNOTATION} annotations are missing`);
    }

    return { repositorySlug, manifestFilePath };
};
