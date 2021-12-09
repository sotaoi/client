import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  SweetAlertOptions,
  SweetAlertResult,
  Awaited,
  SweetAlert2,
  ReactSweetAlert,
} from '@sotaoi/contracts/definitions/notification-interface';
import { NotificationContract, PushRoute } from '@sotaoi/contracts/http/notification-contract';
import { CommandResult, ActionConclusion, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';

class NotificationService extends NotificationContract {
  public swal: SweetAlert2 & ReactSweetAlert;
  public actionConclusion: typeof ActionConclusion;

  constructor(pushRoute: PushRoute, actionConclusion: typeof ActionConclusion) {
    super(pushRoute);
    this.swal = withReactContent(Swal);
    this.actionConclusion = actionConclusion;
  }

  public async fire<T = any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>> {
    return this.swal.fire(options);
  }

  public process<T = any>(result: CommandResult | AuthResult | TaskResult): Promise<SweetAlertResult<Awaited<T>>> {
    if (!result.success) {
      return this.swal.fire({
        icon: 'warning',
        title: result.title,
        text: result.msg,
        toast: true,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }

    return this.swal.fire({
      icon: 'success',
      title: result.title,
      text: result.msg,
      toast: true,
      position: 'bottom-right',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  public conclusion<T = any>(result: CommandResult | AuthResult | TaskResult): ActionConclusion<T> {
    return new this.actionConclusion(result, this, this.pushRoute);
  }
}

export { NotificationService };
