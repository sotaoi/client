import React from 'react';
import { BaseField, FieldInit } from '@sotaoi/client/forms/fields/base-field';
import { BaseInput, FieldValidation } from '@sotaoi/input/base-input';
import { FormInput } from '@sotaoi/input/form-input';
import { InputValidator } from '@sotaoi/contracts/http/input-validator-contract';

interface FormFieldHandler {
  value: any;
  change: (value: any) => any;
  pocket: { [key: string]: any };
}

interface FormFieldProps {
  onChange: (ev: any) => void;
  render: (handler: FormFieldHandler) => null | React.ReactElement;
  pocket?: { [key: string]: any };
}
interface ComponentState {
  value: any;
}
class FormField<ComponentProps extends FormFieldProps> extends BaseField<FormInput, ComponentProps, ComponentState> {
  public pocket: { [key: string]: any } = {};

  constructor(
    name: string,
    key: string,
    getFormValidation: () => InputValidator<(key: string) => void | null | BaseInput<any, any>>,
    validations: FieldValidation[],
    getRerender: () => (force: boolean) => void,
    value: FormInput
  ) {
    super(name, key, getFormValidation, validations, getRerender, value);
  }

  public init(): FieldInit {
    return {
      value: this.getInputValue(this.value || null),
      onChange: async (ev: any): Promise<void> => {
        this.set(this.convert(ev.target.value || null));
        await this.validate();
        this.rerender(true);
      },
      onBlur: async (ev: any): Promise<void> => {
        this.setTouched(true);
        await this.validate();
        this.rerender(true);
      },
    };
  }

  public set(input: FormInput): void {
    this.value = input || null;
    this._ref?.setValue(input || null);
  }

  public clear(): void {
    this.setTouched(true);
    this.set(new FormInput(null));
  }

  public isEmpty(): boolean {
    return !this.getInputValue();
  }

  public convert(value: FormInput | any): FormInput {
    if (value instanceof FormInput) {
      return value;
    }
    return new FormInput(typeof value !== 'undefined' ? value : null);
  }

  public getInputValue(input: FormInput = this.value): any {
    return input.getValue();
  }

  public wasChanged(): boolean {
    return this.getInputValue() !== this.initialValue.getValue();
  }

  //

  public initialState(props: ComponentProps): ComponentState {
    return { value: this.value.value || null };
  }

  public setValue(input: FormInput, context: React.Component<ComponentProps, ComponentState>): void {
    context.setState({ value: input.getValue() });
  }

  public getValue(context: React.Component<ComponentProps, ComponentState>): any {
    return context.state.value || null;
  }

  public render(context: React.Component<ComponentProps, ComponentState>): null | React.ReactElement {
    return context.props.render({
      value: context.state.value,
      change: (value) => {
        this.value.value = value;
        this.set(this.convert(this.value));
        this.validate();
        this.rerender(true);
        context.props.onChange(value);
      },
      pocket: (context.props.pocket || {}) as any,
    });
  }

  public static getDerivedStateFromProps(
    nextProps: { [key: string]: any },
    state: { [key: string]: any }
  ): null | { [key: string]: any } {
    return { ...state, value: (nextProps as any).value || null };
  }
}

export { FormField };
export type { FormFieldHandler };
