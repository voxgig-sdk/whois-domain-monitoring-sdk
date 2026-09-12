import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { EmailValidate, EmailValidateLoadMatch } from '../WhoisDomainMonitoringTypes';
declare class EmailValidateEntity extends WhoisDomainMonitoringEntityBase<EmailValidate> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: EmailValidateEntity): EmailValidateEntity;
    load(this: any, reqmatch?: EmailValidateLoadMatch, ctrl?: Control): Promise<EmailValidateEntity>;
}
export { EmailValidateEntity };
