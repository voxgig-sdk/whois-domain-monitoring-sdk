import { WhoisDomainMonitoringEntityBase } from '../WhoisDomainMonitoringEntityBase';
import type { WhoisDomainMonitoringSDK } from '../WhoisDomainMonitoringSDK';
import type { Control } from '../types';
import type { Grammar, GrammarCreateData } from '../WhoisDomainMonitoringTypes';
declare class GrammarEntity extends WhoisDomainMonitoringEntityBase<Grammar> {
    constructor(client: WhoisDomainMonitoringSDK, entopts: any);
    make(this: GrammarEntity): GrammarEntity;
    create(this: any, reqdata?: GrammarCreateData, ctrl?: Control): Promise<GrammarEntity>;
}
export { GrammarEntity };
