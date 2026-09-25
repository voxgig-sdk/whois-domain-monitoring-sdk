"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DnsResultEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WHOIS_DOMAIN_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WhoisDomainMonitoringSDK.test();
        const ent = testsdk.DnsResult();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dns_result.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "domain": { "a": true, "h": "Domain", "n": "domain", "r": false, "t": "`$STRING`", "key$": "domain", "index$": 0 }, "records": { "a": true, "h": "Records", "n": "records", "r": false, "t": "`$OBJECT`", "key$": "records", "index$": 1 } }, "name": "dns_result", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /dns-lookup", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "example.com", "k": "query", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "A,MX,TXT", "k": "query", "n": "type", "or": "type", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/dns-lookup", "q": { "exist": ["domain", "type"] }, "r": {}, "s": [{ "lit": "dns-lookup" }], "t": { "req": "`reqdata`", "res": "`body.records`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "dns_result", "name__orig": "dns_result", "Name": "DnsResult", "name_": "dns_result", "name-": "dns-result", "NAME": "DNS_RESULT", "index$": 0 }, { "active": true, "entity": "dns_result", "key$": "BasicDnsResultFlow", "kind": "basic", "name": "BasicDnsResultFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dns_result_ref01", "srcdatavar": "dns_result_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dns_result_ref01" } }], "index$": 0 }] }, 'DnsResult', { "GET /dns-lookup": { "protocol": "http", "operationId": "dnsLookup", "responses": { "200": { "description": "DNS records", "content": { "application/json": { "schema": { "type": "object", "properties": { "domain": { "key$": "domain", "type": "string" }, "records": { "additionalProperties": { "items": { "properties": { "priority": { "description": "MX/SRV priority", "type": "integer" }, "ttl": { "type": "integer" }, "value": { "type": "string" } }, "type": "object" }, "type": "array", "key$": "additionalProperties" }, "key$": "records", "type": "object" } }, "x-ref": "#/components/schemas/DnsResult" }, "example": { "domain": "example.com", "records": { "A": [{ "value": "93.184.216.34", "ttl": 3600 }], "MX": [{ "value": "mail.example.com", "priority": 10, "ttl": 3600 }] } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "X-API-Key header required", "signup_url": "https://kiprio.com/signup" } } }, "x-ref": "#/components/responses/Unauthorized" }, "429": { "description": "Rate limit exceeded", "headers": { "Retry-After": { "schema": { "type": "integer" }, "description": "Seconds until the rate limit resets" } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "rate limit: 30 req/min exceeded" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "domain", "in": "query", "required": true, "schema": { "type": "string", "example": "example.com" }, "description": "Domain to look up", "index$": 0 }, { "name": "types", "in": "query", "required": false, "schema": { "type": "string", "example": "A,MX,TXT", "default": "A,AAAA,MX,TXT,CNAME,NS" }, "description": "Comma-separated list of record types to fetch", "index$": 1 }], "security": [{ "ApiKeyHeader": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyHeader": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "Get your free API key at https://kiprio.com/signup" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let dns_result_ref01_data = Object.values(setup.data.existing.dns_result)[0];
        // LOAD
        const dns_result_ref01_ent = client.DnsResult();
        const dns_result_ref01_match_dt0 = {};
        const dns_result_ref01_data_dt0 = (await dns_result_ref01_ent.load(dns_result_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != dns_result_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dns_result/DnsResultTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WhoisDomainMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dns_result01', 'dns_result02', 'dns_result03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID': idmap,
        'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_APIKEY': '',
    });
    idmap = env['WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID'];
    const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WhoisDomainMonitoringSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.WHOIS_DOMAIN_MONITORING_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DnsResultEntity.test.js.map