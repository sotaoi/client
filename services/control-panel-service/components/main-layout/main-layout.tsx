import React from 'react';
import { LayoutProps } from '@sotaoi/contracts/state';

const MainLayout = (props: LayoutProps): null | React.ReactElement => (
  <div style={{ margin: 10 }}>
    <h2>Control Panel</h2>

    <hr />

    {props.children}
  </div>
);

export { MainLayout };
