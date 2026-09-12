import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Ipn, IpnLoadMatch } from '../WhoisDomainMonitoringTypes';
declare class IpnEntity extends WhoisDomainMonitoringEntityBase<Ipn> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: IpnEntity): IpnEntity;
    load(this: any, reqmatch?: IpnLoadMatch, ctrl?: Control): Promise<IpnEntity>;
}
export { IpnEntity };
