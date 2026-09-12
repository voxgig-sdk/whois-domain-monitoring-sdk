import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Whoi, WhoiListMatch } from '../WhoisDomainMonitoringTypes';
declare class WhoiEntity extends WhoisDomainMonitoringEntityBase<Whoi> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: WhoiEntity): WhoiEntity;
    list(this: any, reqmatch?: WhoiListMatch, ctrl?: Control): Promise<WhoiEntity[]>;
}
export { WhoiEntity };
