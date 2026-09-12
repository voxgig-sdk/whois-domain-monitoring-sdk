import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Ssl, SslListMatch } from '../WhoisDomainMonitoringTypes';
declare class SslEntity extends WhoisDomainMonitoringEntityBase<Ssl> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: SslEntity): SslEntity;
    list(this: any, reqmatch?: SslListMatch, ctrl?: Control): Promise<SslEntity[]>;
}
export { SslEntity };
