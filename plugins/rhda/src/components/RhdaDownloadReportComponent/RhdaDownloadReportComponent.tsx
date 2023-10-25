import React, {useState} from 'react';
import {
    Progress,
    ResponseErrorPanel
} from '@backstage/core-components';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import {useRhdaAppData} from "../../useRhdaAppdata";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(
    _theme => ({
        exportButton: {
            border: 'none',
            color: 'black',
            textAlign: 'center',
            textDecoration: 'none',
        }
    }),
);
export const RhdaDownloadReportComponent = () => {
    const classes = useStyles();
    const config = useApi(configApiRef);
    const { repositorySlug, manifestFilePath, error } = useRhdaAppData();
    const [loading, setLoading] = useState(false);

    if(error){
        return (<ResponseErrorPanel title={`RHDA Overview: ${error.name}`} error={error} />);
    }

    function downloadHtmlReport(){
        setLoading(true);
           fetch(`${config.getString("backend.baseUrl")}/api/rhda/rhda-html-report-download?repositorySlug=${repositorySlug}&manifestFilePath=${manifestFilePath}`,{})
                .then(res => (res.ok ? res : Promise.reject(res)))
                .then(res => res.blob())
               .then((blob)=> {
                   const link = document.createElement('a');
                   link.href = window.URL.createObjectURL(new Blob([blob]));
                   link.setAttribute('download', 'RHDA-generated-html-report.html');
                   link.setAttribute('type','hidden');
                   document.body.appendChild(link);
                   link.click();
                   setLoading(false);
               });
     }

    if (loading) {
        return (
            <div>Generating the report..please wait <Progress/> </div>
        );
    }
        return (
            <div>
            <Button className={classes.exportButton} onClick={downloadHtmlReport} variant="contained">
                Download Full Report
            </Button>
            </div>
        );
};


