import React from 'react';
import { ViewComponent, ViewData, ViewPromises } from '@sotaoi/client/components';
import { AuthFormFactory, FormConstructor } from '@sotaoi/client/forms';
import { Artifacts } from '@sotaoi/omni/artifacts';
import { AuthForm } from '@sotaoi/client/forms/form-classes/auth-form';
import { AuthMaintainerForm } from '@sotaoi/client/services/control-panel-service/components/gate-layout/forms/maintainer/auth-maintainer-form';
import { InputField } from '@sotaoi/client/forms/fields/input-field';
import { getMaintainerFormValidations } from '@sotaoi/client/services/control-panel-service/queries/validation-queries';

interface AuthMaintainerViewProps {}
class AuthMaintainerView extends ViewComponent<AuthMaintainerViewProps> {
  public promises(): ViewPromises<AuthMaintainerViewProps> {
    return {
      validations: getMaintainerFormValidations(),
    };
  }

  public init({ results, props }: ViewData<AuthMaintainerViewProps>): { form: AuthForm } {
    const authMaintainerFormConstructor = FormConstructor(
      {
        email: InputField.input(''),
        password: InputField.input(''),
      },
      results.validations,
    );

    const Form = AuthFormFactory(
      new Artifacts(),
      'sotaoi-maintainer',
      authMaintainerFormConstructor,
      'test:password:email:username',
    );
    Form.init();

    React.useEffect(() => {
      return (): void => {
        Form.unmount();
      };
    }, []);

    Form.onAuthSuccess(async (result) => {
      // do nothing (will be redirected by router rules)
    });

    return { form: Form };
  }

  public web(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement {
    return <AuthMaintainerForm {...this.init(data)} />;
  }

  public mobile(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement {
    // nothing here yet
    return null;
  }

  public electron(data: ViewData<AuthMaintainerViewProps>): null | React.ReactElement {
    // nothing here yet
    return null;
  }
}

export { AuthMaintainerView };
