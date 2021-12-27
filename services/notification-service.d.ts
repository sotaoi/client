import { SweetAlertOptions, SweetAlertResult, Awaited, SweetAlert2, ReactSweetAlert } from '@sotaoi/contracts/definitions/notification-interface';
import { NotificationContract, PushRoute } from '@sotaoi/contracts/http/notification-contract';
import { CommandResult, ActionConclusion, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';
declare class NotificationService extends NotificationContract {
    swal: SweetAlert2 & ReactSweetAlert;
    actionConclusion: typeof ActionConclusion;
    constructor(pushRoute: PushRoute, actionConclusion: typeof ActionConclusion);
    fire<T = any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>>;
    process<T = any>(result: CommandResult | AuthResult | TaskResult): Promise<SweetAlertResult<Awaited<T>>>;
    conclusion<T = any>(result: CommandResult | AuthResult | TaskResult): ActionConclusion<T>;
}
export { NotificationService };
