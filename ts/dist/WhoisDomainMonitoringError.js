"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoisDomainMonitoringError = void 0;
class WhoisDomainMonitoringError extends Error {
    isWhoisDomainMonitoringError = true;
    sdk = 'WhoisDomainMonitoring';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.WhoisDomainMonitoringError = WhoisDomainMonitoringError;
//# sourceMappingURL=WhoisDomainMonitoringError.js.map