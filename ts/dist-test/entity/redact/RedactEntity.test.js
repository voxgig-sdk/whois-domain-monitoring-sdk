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
(0, node_test_1.describe)('RedactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WHOIS_DOMAIN_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WhoisDomainMonitoringSDK.test();
        const ent = testsdk.Redact();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'redact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "counts": { "a": true, "h": "Counts", "n": "counts", "r": false, "t": "`$OBJECT`", "key$": "counts", "index$": 0 }, "entities": { "a": true, "h": "Entities", "n": "entities", "r": false, "sh": "Include detected entity positions in response", "t": "`$ARRAY`", "key$": "entities", "index$": 1 }, "original_length": { "a": true, "h": "Original Length", "n": "original_length", "r": false, "t": "`$INTEGER`", "key$": "original_length", "index$": 2 }, "redact": { "a": true, "h": "Redact", "n": "redact", "r": false, "sh": "Comma-separated PII types to redact.", "t": "`$STRING`", "key$": "redact", "index$": 3 }, "redacted": { "a": true, "h": "Redacted", "n": "redacted", "r": false, "t": "`$STRING`", "key$": "redacted", "index$": 4 }, "text": { "a": true, "h": "Text", "n": "text", "r": true, "sh": "Text to redact", "t": "`$STRING`", "key$": "text", "index$": 5 } }, "name": "redact", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /redact", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/redact", "q": {}, "r": {}, "s": [{ "lit": "redact" }], "t": { "req": { "redact": "`reqdata`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "redact", "name__orig": "redact", "Name": "Redact", "name_": "redact", "name-": "redact", "NAME": "REDACT", "index$": 6 }, { "active": true, "entity": "redact", "key$": "BasicRedactFlow", "kind": "basic", "name": "BasicRedactFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "redact_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Redact', { "POST /redact": { "protocol": "http", "operationId": "redactPii", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["text"], "properties": { "text": { "type": "string", "example": "Call John on 07911 123456 or email john@example.com", "description": "Text to redact", "key$": "text" }, "redact": { "type": "string", "example": "phone,email", "description": "Comma-separated PII types to redact. Omit for all types.", "key$": "redact" }, "entities": { "type": "boolean", "default": false, "description": "Include detected entity positions in response", "key$": "entities" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Redacted text", "content": { "application/json": { "schema": { "type": "object", "properties": { "original_length": { "type": "integer", "key$": "original_length" }, "redacted": { "type": "string", "key$": "redacted" }, "counts": { "type": "object", "additionalProperties": { "type": "integer" }, "example": { "phone": 1, "email": 2 }, "key$": "counts" }, "entities": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string", "example": "phone" }, "value": { "type": "string" }, "offset": { "type": "integer" } } }, "key$": "entities" } }, "x-ref": "#/components/schemas/RedactResult", "index$": 0 }, "example": { "original_length": 50, "redacted": "Call [NAME] on [PHONE] or email [EMAIL]", "counts": { "phone": 1, "email": 1 }, "entities": [{ "type": "phone", "value": "07911 123456", "offset": 15 }] } } } }, "400": { "description": "Invalid request parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequest" }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "X-API-Key header required", "signup_url": "https://kiprio.com/signup" } } }, "x-ref": "#/components/responses/Unauthorized" }, "429": { "description": "Rate limit exceeded", "headers": { "Retry-After": { "schema": { "type": "integer" }, "description": "Seconds until the rate limit resets" } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "rate limit: 30 req/min exceeded" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [], "security": [{ "ApiKeyHeader": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyHeader": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "Get your free API key at https://kiprio.com/signup" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const redact_ref01_ent = client.Redact();
        let redact_ref01_data = setup.data.new.redact['redact_ref01'];
        redact_ref01_data = (await redact_ref01_ent.create(redact_ref01_data)).data();
        (0, node_assert_1.default)(null != redact_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/redact/RedactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WhoisDomainMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['redact01', 'redact02', 'redact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID': idmap,
        'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_APIKEY': '',
    });
    idmap = env['WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID'];
    const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID'];
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
//# sourceMappingURL=RedactEntity.test.js.map