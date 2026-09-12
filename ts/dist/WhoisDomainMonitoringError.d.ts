import { Context } from './Context';
declare class WhoisDomainMonitoringError extends Error {
    isWhoisDomainMonitoringError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WhoisDomainMonitoringError };
