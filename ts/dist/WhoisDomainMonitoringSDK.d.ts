import { DnsResultEntity } from './entity/DnsResultEntity';
import { DomainEntity } from './entity/DomainEntity';
import { EmailValidateEntity } from './entity/EmailValidateEntity';
import { GenerateEntity } from './entity/GenerateEntity';
import { GrammarEntity } from './entity/GrammarEntity';
import { IpnEntity } from './entity/IpnEntity';
import { RedactEntity } from './entity/RedactEntity';
import { SslEntity } from './entity/SslEntity';
import { UtilityEntity } from './entity/UtilityEntity';
import { WhoiEntity } from './entity/WhoiEntity';
export type * from './WhoisDomainMonitoringTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WhoisDomainMonitoringEntityBase } from './WhoisDomainMonitoringEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class WhoisDomainMonitoringSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    DnsResult(entopts?: Record<string, any>): DnsResultEntity;
    Domain(entopts?: Record<string, any>): DomainEntity;
    EmailValidate(entopts?: Record<string, any>): EmailValidateEntity;
    Generate(entopts?: Record<string, any>): GenerateEntity;
    Grammar(entopts?: Record<string, any>): GrammarEntity;
    Ipn(entopts?: Record<string, any>): IpnEntity;
    Redact(entopts?: Record<string, any>): RedactEntity;
    Ssl(entopts?: Record<string, any>): SslEntity;
    Utility(entopts?: Record<string, any>): UtilityEntity;
    Whoi(entopts?: Record<string, any>): WhoiEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WhoisDomainMonitoringSDK;
    tester(testopts?: any, sdkopts?: any): WhoisDomainMonitoringSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WhoisDomainMonitoringSDK;
export { stdutil, config, BaseFeature, WhoisDomainMonitoringEntityBase, WhoisDomainMonitoringSDK, SDK, };
