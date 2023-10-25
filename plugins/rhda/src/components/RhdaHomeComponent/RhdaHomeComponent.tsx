import React from 'react';
import {Grid} from '@material-ui/core';
import {
    Page,
    Content,
} from '@backstage/core-components';
import {RhdaOverviewComponent} from "../RhdaOverviewComponent";

export const RhdaHomeComponent = () => (
    <Page themeId="tool">
        <Content>
            <Grid container spacing={3} direction="column">
                <Grid item>
                    <RhdaOverviewComponent/>
                </Grid>
            </Grid>
        </Content>
    </Page>
);
