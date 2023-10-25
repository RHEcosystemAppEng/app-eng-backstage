import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const rhdaPlugin = createPlugin({
  id: 'rhda',
  routes: {
    root: rootRouteRef,
  },
});

export const RhdaPage = rhdaPlugin.provide(
  createRoutableExtension({
    name: 'RhdaPage',
    component: () =>
      import('./components/RhdaHomeComponent').then(m => m.RhdaHomeComponent),
    mountPoint: rootRouteRef,
  }),
);


export const RhdaOverview = rhdaPlugin.provide(
    createRoutableExtension({
        name: 'RhdaOverview',
        component: () =>
            import('./components/RhdaOverviewComponent').then(m => m.RhdaOverviewComponent),
        mountPoint: rootRouteRef,
    }),
);

export const RhdaDownloadReport = rhdaPlugin.provide(
    createRoutableExtension({
        name: 'RhdaDownloadReport',
        component: () =>
            import('./components/RhdaDownloadReportComponent').then(m => m.RhdaDownloadReportComponent),
        mountPoint: rootRouteRef,
    }),
);