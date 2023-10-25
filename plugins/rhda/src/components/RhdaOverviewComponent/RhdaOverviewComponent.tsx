import React from 'react';
import {
    InfoCard, Progress, ResponseErrorPanel
} from '@backstage/core-components';
import Stack from '@mui/material/Stack';
import useAsync from "react-use/lib/useAsync";
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import {DialogActions, makeStyles} from '@material-ui/core';
import {ScanResponse} from "../../types";
import {useRhdaAppData} from "../../useRhdaAppdata";
import {RhdaDownloadReportComponent} from "../RhdaDownloadReportComponent";

const useStyles = makeStyles(
    _theme => ({
        projectInfo:{
            padding: '2rem 2rem',
            flexWrap: 'wrap',
            fontSize: '10rem'
        },
        card:{
            padding: '2rem 2rem',
            verticalAlign: 'middle',
            flexWrap: 'wrap',
            fontSize: '1.5rem'
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
            color: 'coral',
            fontSize: '50px'
        },
        mediumLabel: {
            color: 'coral',
            fontSize: '15px',
            alignContent:'center'
        },
        low: {
            color: 'orange',
            fontSize: '50px'
        },
        lowLabel: {
            color: 'orange',
            fontSize: '15px',
            alignContent:'center'
        }
    }),
);

export const RhdaOverviewComponent = () => {
    const classes = useStyles();
    const config = useApi(configApiRef);
    const { repositorySlug, manifestFilePath, error } = useRhdaAppData();

    if(error){
        return (<ResponseErrorPanel title={`RHDA Overview: ${error.name}`} error={error} />);
    }

    const { value, loading, apiError } = useAsync(async (): Promise<ScanResponse> => {
        return fetch(`${config.getString("backend.baseUrl")}/api/rhda/rhda-analysis?repositorySlug=${repositorySlug}&manifestFilePath=${manifestFilePath}`)
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json());
    }, []);

    if (loading) {
        return <Progress />;
    } else if (apiError) {
        return <ResponseErrorPanel error={error} />;
    }

    return (<InfoCard
        title="RHDA Overview"
        variant="gridItem"
    >
        <div className={classes.card}> The codebase {repositorySlug} =&gt; {manifestFilePath} has undergone a comprehensive security scan, identifying following vulnerabilities. Immediate attention is required to remediate these security concerns. You can also download the full report. </div>
        <Stack direction="row" spacing={15}>
            <div className={classes.card}>
                <div className={classes.critical}>
                    {value?.vulnerabilities?.critical}
                </div>
                <div className={classes.criticalLabel}>
                    Critical
                </div>
            </div>
            <div className={classes.card}>
                <div className={classes.high}>
                    {value?.vulnerabilities?.high}
                </div>
                <div className={classes.highLabel}>
                    High
                </div>
            </div>
            <div className={classes.card}>
                <div className={classes.medium}>
                    {value?.vulnerabilities?.medium}
                </div>
                <div className={classes.mediumLabel}>
                    Medium
                </div>
            </div>
            <div className={classes.card}>
                <div className={classes.low}>
                    {value?.vulnerabilities?.low}
                </div>
                <div className={classes.lowLabel}>
                    Low
                </div>
            </div>
        </Stack>
        <DialogActions>
            <RhdaDownloadReportComponent/>
        </DialogActions>
    </InfoCard>);

};


