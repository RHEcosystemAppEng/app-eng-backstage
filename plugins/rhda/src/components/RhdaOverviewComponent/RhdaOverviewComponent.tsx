import React from 'react';
import {Badge, Box, Chip, Grid, makeStyles, Paper, styled, Typography} from '@material-ui/core';
import {
    InfoCard, InfoCardVariants, Progress, ResponseErrorPanel
} from '@backstage/core-components';
import Stack from '@mui/material/Stack';
import useAsync from "react-use/lib/useAsync";
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import {DenseTable, exampleUsers} from "../RhdaHomeFetchComponent/RhdaHomeFetchComponent";


type ScanResult = {
    critical: number;
    high: number;
    medium: number;
    low: number;
};



export const RhdaOverviewComponent = () => {
    const config = useApi(configApiRef);
    const { value, loading, error } = useAsync(async (): Promise<ScanResult> => {
        return fetch(`${config.getString("backend.baseUrl")}/api/rhda/rhda-analysis`)
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json());
}, []);
// eslint-disable-next-line no-console
console.log("value------->", value);

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 120,
        height: 120,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
    }));


if (loading) {
    return <Progress />;
} else if (error) {
    return <ResponseErrorPanel error={error} />;
}

return (<InfoCard
    title="RHDA Overview"
    variant="gridItem"
>

    <Stack direction="row" spacing={15}>
        <Stack>
            <Badge id="critialLabel" badgeContent={value?.critical} color="secondary"  overlap="rectangular" />
            <label htmlFor="critialLabel">Critical</label>
        </Stack>
        <Stack>
            <Badge id="highLabel" badgeContent={value?.high} color="error" overlap="rectangular"/>
            <label htmlFor="highLabel">High</label>
        </Stack>
        <Stack>
            <Badge id="mediumLabel" badgeContent={value?.medium} color="default" overlap="rectangular"/>
            <label htmlFor="mediumLabel">Medium</label>
        </Stack>
        <Stack>
            <Badge id="lowLabel" badgeContent={value?.low} color="primary" overlap="rectangular"/>
            <label htmlFor="lowLabel">Low</label>
        </Stack>
    </Stack>
</InfoCard>);

};
