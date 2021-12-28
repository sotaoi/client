import React from 'react';
interface LinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    children: any;
    to: string | ((ev: any) => Promise<void>);
    noGoTop?: boolean;
}
declare const Link: React.FunctionComponent<LinkProps>;
export { Link };
