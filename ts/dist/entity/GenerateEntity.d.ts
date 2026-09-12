import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Generate, GenerateLoadMatch } from '../WhoisDomainMonitoringTypes';
declare class GenerateEntity extends WhoisDomainMonitoringEntityBase<Generate> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: GenerateEntity): GenerateEntity;
    load(this: any, reqmatch?: GenerateLoadMatch, ctrl?: Control): Promise<GenerateEntity>;
}
export { GenerateEntity };
