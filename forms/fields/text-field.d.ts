import React from 'react';
import { InputField } from '@sotaoi/client/forms/fields/input-field';
interface ComponentProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    onChange: (ev: any) => void;
    value: string;
    secureTextEntry?: boolean;
}
interface ComponentState {
    value: string;
}
declare class TextField extends InputField<ComponentProps | any> {
    render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement;
}
export { TextField };
export { StringInput } from '@sotaoi/input/string-input';
