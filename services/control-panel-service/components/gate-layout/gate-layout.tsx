import React from 'react';
import { LayoutProps } from '@sotaoi/contracts/state';

const GateLayout = (props: LayoutProps): null | React.ReactElement => (
  <div style={{ margin: 10 }}>
    <h2>Authenticate</h2>

    <hr />

    {props.children}
  </div>
);

export { GateLayout };
