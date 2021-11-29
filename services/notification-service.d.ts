import { SweetAlertOptions, SweetAlertResult, Awaited, SweetAlert2, ReactSweetAlert } from '@sotaoi/contracts/definitions/notification-interface';
import { Notification, PushRoute } from '@sotaoi/contracts/http/notification-contract';
import { CommandResult, ActionConclusion, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';
declare class NotificationService extends Notification {
    swal: SweetAlert2 & ReactSweetAlert;
    constructor(pushRoute: PushRoute);
    fire<T = any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>>;
    process<T = any>(result: CommandResult | AuthResult | TaskResult): Promise<SweetAlertResult<Awaited<T>>>;
    conclusion<T = any>(result: CommandResult | AuthResult | TaskResult): ActionConclusion<T>;
}
export { NotificationService };
