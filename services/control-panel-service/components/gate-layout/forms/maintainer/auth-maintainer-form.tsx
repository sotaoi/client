import React from 'react';
import { AuthForm } from '@sotaoi/client-forms/form-classes/auth-form';
import { BaseField } from '@sotaoi/client-forms/fields/base-field';

interface FieldState {
  [key: string]: BaseField<any>;
}
const AuthMaintainerForm = (props: { form: AuthForm }): null | React.ReactElement => {
  const Form = props.form;
  const fields = Form.getFields<FieldState>();

  return (
    <section style={{ margin: 20 }}>
      <Form.FormComponent>
        <div className={'w-full max-w-xs m-auto bg-gray-100 rounded p-5'}>
          <h1 className={'text-center sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-900'}>LOGIN</h1>

          {fields.email.wasTouched() &&
            fields.email.getErrors().map((error: any, index: any) => (
              <div key={index} className={'text-red-600 text-sm'}>
                {error}
              </div>
            ))}
          <fields.email.component
            className={'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300'}
            placeholder={'email'}
          />
          <br />

          {fields.password.wasTouched() &&
            fields.password.getErrors().map((error: any, index: any) => (
              <div key={index} style={{ color: '#ff3333', marginBottom: 10 }}>
                {error}
              </div>
            ))}
          <fields.password.component
            autoComplete={'off'}
            type={'password'}
            placeholder={'password'}
            className={'w-full p-2 mb-6 text-black border-b-2 border-green-500 outline-none focus:bg-gray-300'}
          />
          <br />

          <button
            disabled={!Form.getFormState().canSubmit}
            type={'submit'}
            onClick={(): void => {
              Form.submit();
            }}
          >
            Login
          </button>
        </div>
      </Form.FormComponent>
    </section>
  );
};

export { AuthMaintainerForm };
