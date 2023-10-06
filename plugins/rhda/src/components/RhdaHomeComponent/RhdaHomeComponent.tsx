import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import {RhdaOverview} from "../../plugin";

export const RhdaHomeComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to rhda!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="RHDA">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
            <RhdaOverview/>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
