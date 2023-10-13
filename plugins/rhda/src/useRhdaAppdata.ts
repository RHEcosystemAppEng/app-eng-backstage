import { useEntity } from '@backstage/plugin-catalog-react';

const PROJECT_REPO_ANNOTATION = 'github.com/project-slug';
const MANIFEST_FILE_ANNOTATION = 'rhda/manifest-file-path';

export const useRhdaAppData = () => {
    const { entity } = useEntity();
    const repositorySlug =
        entity?.metadata.annotations?.[PROJECT_REPO_ANNOTATION] ?? '';

    const manifestFilePath =
        entity?.metadata.annotations?.[MANIFEST_FILE_ANNOTATION] ?? '';

    return { repositorySlug, manifestFilePath };
};
