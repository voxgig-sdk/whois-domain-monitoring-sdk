import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Redact, RedactCreateData } from '../WhoisDomainMonitoringTypes';
declare class RedactEntity extends WhoisDomainMonitoringEntityBase<Redact> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: RedactEntity): RedactEntity;
    create(this: any, reqdata?: RedactCreateData, ctrl?: Control): Promise<RedactEntity>;
}
export { RedactEntity };
