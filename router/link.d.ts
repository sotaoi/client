import React from 'react';
interface LinkProps {
    children: any;
    to: string | ((ev: any) => Promise<void>);
    noGoTop?: boolean;
}
declare const Link: React.FunctionComponent<LinkProps>;
export { Link };
