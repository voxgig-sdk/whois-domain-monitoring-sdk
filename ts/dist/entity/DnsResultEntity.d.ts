import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { DnsResult, DnsResultLoadMatch } from '../WhoisDomainMonitoringTypes';
declare class DnsResultEntity extends WhoisDomainMonitoringEntityBase<DnsResult> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: DnsResultEntity): DnsResultEntity;
    load(this: any, reqmatch?: DnsResultLoadMatch, ctrl?: Control): Promise<DnsResultEntity>;
}
export { DnsResultEntity };
