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
(0, node_test_1.describe)('EmailValidateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WHOIS_DOMAIN_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WhoisDomainMonitoringSDK.test();
        const ent = testsdk.EmailValidate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_validate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "confidence": { "a": true, "fo": "float", "h": "Confidence", "n": "confidence", "r": false, "t": "`$NUMBER`", "key$": "confidence", "index$": 0 }, "disposable": { "a": true, "h": "Disposable", "n": "disposable", "r": false, "t": "`$BOOLEAN`", "key$": "disposable", "index$": 1 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": false, "t": "`$STRING`", "key$": "email", "index$": 2 }, "free_provider": { "a": true, "h": "Free Provider", "n": "free_provider", "r": false, "t": "`$BOOLEAN`", "key$": "free_provider", "index$": 3 }, "mx_found": { "a": true, "h": "Mx Found", "n": "mx_found", "r": false, "t": "`$BOOLEAN`", "key$": "mx_found", "index$": 4 }, "role_based": { "a": true, "h": "Role Based", "n": "role_based", "r": false, "t": "`$BOOLEAN`", "key$": "role_based", "index$": 5 }, "suggest": { "a": true, "h": "Suggest", "n": "suggest", "r": false, "sh": "Suggested correction for typos", "t": "`$STRING`", "key$": "suggest", "index$": 6 }, "syntax_ok": { "a": true, "h": "Syntax Ok", "n": "syntax_ok", "r": false, "t": "`$BOOLEAN`", "key$": "syntax_ok", "index$": 7 }, "valid": { "a": true, "h": "Valid", "n": "valid", "r": false, "t": "`$BOOLEAN`", "key$": "valid", "index$": 8 } }, "name": "email_validate", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /email-validate", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "user@example.com", "k": "query", "n": "email", "or": "email", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/email-validate", "q": { "exist": ["email"] }, "r": {}, "s": [{ "lit": "email-validate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "email_validate", "name__orig": "email_validate", "Name": "EmailValidate", "name_": "email_validate", "name-": "email-validate", "NAME": "EMAIL_VALIDATE", "index$": 2 }, { "active": true, "entity": "email_validate", "key$": "BasicEmailValidateFlow", "kind": "basic", "name": "BasicEmailValidateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_validate_ref01", "srcdatavar": "email_validate_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_validate_ref01" } }], "index$": 0 }] }, 'EmailValidate', { "GET /email-validate": { "protocol": "http", "operationId": "emailValidate", "responses": { "200": { "description": "Validation result", "content": { "application/json": { "schema": { "type": "object", "properties": { "email": { "format": "email", "key$": "email", "type": "string" }, "valid": { "key$": "valid", "type": "boolean" }, "syntax_ok": { "key$": "syntax_ok", "type": "boolean" }, "mx_found": { "key$": "mx_found", "type": "boolean" }, "disposable": { "key$": "disposable", "type": "boolean" }, "free_provider": { "key$": "free_provider", "type": "boolean" }, "role_based": { "key$": "role_based", "type": "boolean" }, "suggest": { "description": "Suggested correction for typos", "key$": "suggest", "nullable": true, "type": "string" }, "confidence": { "format": "float", "key$": "confidence", "maximum": 1, "minimum": 0, "type": "number" } }, "x-ref": "#/components/schemas/EmailValidateResult", "index$": 0 }, "example": { "email": "user@example.com", "valid": true, "syntax_ok": true, "mx_found": true, "disposable": false, "free_provider": false, "role_based": false, "suggest": null, "confidence": 0.95 } } } }, "400": { "description": "Invalid request parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequest" }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "X-API-Key header required", "signup_url": "https://kiprio.com/signup" } } }, "x-ref": "#/components/responses/Unauthorized" }, "429": { "description": "Rate limit exceeded", "headers": { "Retry-After": { "schema": { "type": "integer" }, "description": "Seconds until the rate limit resets" } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string" }, "signup_url": { "type": "string", "format": "uri" } }, "x-ref": "#/components/schemas/Error" }, "example": { "error": "rate limit: 30 req/min exceeded" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "email", "in": "query", "required": true, "schema": { "type": "string", "format": "email", "example": "user@example.com" }, "description": "Email address to validate", "index$": 0 }], "security": [{ "ApiKeyHeader": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyHeader": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "Get your free API key at https://kiprio.com/signup" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let email_validate_ref01_data = Object.values(setup.data.existing.email_validate)[0];
        // LOAD
        const email_validate_ref01_ent = client.EmailValidate();
        const email_validate_ref01_match_dt0 = {};
        const email_validate_ref01_data_dt0 = (await email_validate_ref01_ent.load(email_validate_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != email_validate_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_validate/EmailValidateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WhoisDomainMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_validate01', 'email_validate02', 'email_validate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID': idmap,
        'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_APIKEY': '',
    });
    idmap = env['WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID'];
    const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID'];
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
//# sourceMappingURL=EmailValidateEntity.test.js.map