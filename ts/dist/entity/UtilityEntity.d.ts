import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Utility, UtilityLoadMatch } from '../WhoisDomainMonitoringTypes';
declare class UtilityEntity extends WhoisDomainMonitoringEntityBase<Utility> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: UtilityEntity): UtilityEntity;
    load(this: any, reqmatch?: UtilityLoadMatch, ctrl?: Control): Promise<UtilityEntity>;
}
export { UtilityEntity };
