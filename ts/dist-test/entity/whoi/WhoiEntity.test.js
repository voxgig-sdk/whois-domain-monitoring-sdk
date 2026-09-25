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
(0, node_test_1.describe)('WhoiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WHOIS_DOMAIN_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WhoisDomainMonitoringSDK.test();
        const ent = testsdk.Whoi();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'whoi.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created": { "a": true, "fo": "date-time", "h": "Created", "n": "created", "r": false, "t": "`$STRING`", "key$": "created", "index$": 0 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": false, "t": "`$STRING`", "key$": "domain", "index$": 1 }, "expires": { "a": true, "fo": "date-time", "h": "Expires", "n": "expires", "r": false, "t": "`$STRING`", "key$": "expires", "index$": 2 }, "nameservers": { "a": true, "h": "Nameservers", "n": "nameservers", "r": false, "t": "`$ARRAY`", "key$": "nameservers", "index$": 3 }, "registered": { "a": true, "h": "Registered", "n": "registered", "r": false, "t": "`$BOOLEAN`", "key$": "registered", "index$": 4 }, "registrar": { "a": true, "h": "Registrar", "n": "registrar", "r": false, "t": "`$STRING`", "key$": "registrar", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$ARRAY`", "key$": "status", "index$": 6 }, "updated": { "a": true, "fo": "date-time", "h": "Updated", "n": "updated", "r": false, "t": "`$STRING`", "key$": "updated", "index$": 7 } }, "name": "whoi", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /whois", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "example.com", "k": "query", "n": "domain", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/whois", "q": { "exist": ["domain"] }, "r": {}, "s": [{ "lit": "whois" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "whoi", "name__orig": "whoi", "Name": "Whoi", "name_": "whoi", "name-": "whoi", "NAME": "WHOI", "index$": 9 }, { "active": true, "entity": "whoi", "key$": "BasicWhoiFlow", "kind": "basic", "name": "BasicWhoiFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "whoi_ref01" } }], "index$": 0 }] }, 'Whoi', { "GET /whois": { "protocol": "http", "operationId": "whoisLookup", "responses": { "200": { "description": "WHOIS data", "content": { "application/json": { "schema": { "type": "object", "properties": { "domain": { "example": "example.com", "key$": "domain", "type": "string" }, "registered": { "key$": "registered", "nullable": true, "type": "boolean" }, "registrar": { "key$": "registrar", "nullable": true, "type": "string" }, "status": { "items": { "type": "string" }, "key$": "status", "type": "array" }, "created": { "format": "date-time", "key$": "created", "nullable": true, "type": "string" }, "updated": { "format": "date-time", "key$": "updated", "nullable": true, "type": "string" }, "expires": { "format": "date-time", "key$": "expires", "nullable": true, "type": "string" }, "nameservers": { "items": { "type": "string" }, "key$": "nameservers", "type": "array" } }, "x-ref": "#/components/schemas/WhoisResult", "index$": 0 }, "example": { "domain": "example.com", "registered": true, "registrar": "RESERVED-Internet Assigned Numbers Authority", "status": ["client delete prohibited"], "created": "1995-08-14T04:00:00Z", "updated": "2023-08-14T07:01:34Z", "expires": "2024-08-13T04:00:00Z", "nameservers": ["a.iana-servers.net", "b.iana-servers.net"] } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "X-API-Key header required", "signup_url": "https://kiprio.com/signup" } } }, "x-ref": "#/components/responses/Unauthorized" }, "404": { "description": "Resource not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFound" }, "429": { "description": "Rate limit exceeded", "headers": { "Retry-After": { "schema": { "type": "integer" }, "description": "Seconds until the rate limit resets" } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "rate limit: 30 req/min exceeded" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "domain", "in": "query", "required": true, "schema": { "type": "string", "example": "example.com" }, "description": "Domain name to look up", "index$": 0 }], "security": [{ "ApiKeyHeader": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyHeader": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "Get your free API key at https://kiprio.com/signup" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let whoi_ref01_data = Object.values(setup.data.existing.whoi)[0];
        // LIST
        const whoi_ref01_ent = client.Whoi();
        const whoi_ref01_match = {};
        const whoi_ref01_list = (await whoi_ref01_ent.list(whoi_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/whoi/WhoiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WhoisDomainMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['whoi01', 'whoi02', 'whoi03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID': idmap,
        'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_APIKEY': '',
    });
    idmap = env['WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID'];
    const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID'];
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
//# sourceMappingURL=WhoiEntity.test.js.map