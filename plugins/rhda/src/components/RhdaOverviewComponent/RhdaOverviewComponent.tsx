import React from 'react';
import {
    InfoCard, Progress, ResponseErrorPanel
} from '@backstage/core-components';
import Stack from '@mui/material/Stack';
import useAsync from "react-use/lib/useAsync";
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { makeStyles } from '@material-ui/core';

type ScanResult = {
    critical: number;
    high: number;
    medium: number;
    low: number;
};

const useStyles = makeStyles(
    _theme => ({
        card:{
            padding: '2rem 2rem',
            verticalAlign: 'middle'
        },
        critical: {
            color: 'crimson',
            fontSize: '50px'
        },
        criticalLabel: {
            color: 'crimson',
            fontSize: '15px',
            alignContent:'center'
        },
        high: {
            color: 'red',
            fontSize: '50px'
        },
        highLabel: {
            color: 'red',
            fontSize: '15px',
            alignContent:'center'
        },
        medium: {
            color: 'orange',
            fontSize: '50px'
        },
        mediumLabel: {
            color: 'orange',
            fontSize: '15px',
            alignContent:'center'
        },
        low: {
            color: 'deeppink',
            fontSize: '50px'
        },
        lowLabel: {
            color: 'deeppink',
            fontSize: '15px',
            alignContent:'center'
        }
    }),
);

export const RhdaOverviewComponent = () => {
    const classes = useStyles();
    const config = useApi(configApiRef);
    const { value, loading, error } = useAsync(async (): Promise<ScanResult> => {
        return fetch(`${config.getString("backend.baseUrl")}/api/rhda/rhda-analysis`)
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json());
    }, []);

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
            <div style={{ padding: '2rem 2rem', verticalAlign: 'middle' }}>
                <div className={classes.critical}>
                    {value?.critical}
                </div>
                <div className={classes.criticalLabel}>
                    Critical
                </div>
            </div>
            <div style={{ padding: '2rem 2rem', verticalAlign: 'middle' }}>
                <div className={classes.high}>
                    {value?.high}
                </div>
                <div className={classes.highLabel}>
                    High
                </div>
            </div>
            <div style={{ padding: '2rem 2rem', verticalAlign: 'middle' }}>
                <div className={classes.medium}>
                    {value?.medium}
                </div>
                <div className={classes.mediumLabel}>
                    Medium
                </div>
            </div>
            <div style={{ padding: '2rem 2rem', verticalAlign: 'middle' }}>
                <div className={classes.low}>
                    {value?.low}
                </div>
                <div className={classes.lowLabel}>
                    Low
                </div>
            </div>
        </Stack>
    </InfoCard>);

};