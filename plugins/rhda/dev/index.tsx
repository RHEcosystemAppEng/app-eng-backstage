import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { rhdaPlugin, RhdaPage } from '../src/plugin';

createDevApp()
  .registerPlugin(rhdaPlugin)
  .addPage({
    element: <RhdaPage />,
    title: 'Root Page',
    path: '/rhda'
  })
  .render();
