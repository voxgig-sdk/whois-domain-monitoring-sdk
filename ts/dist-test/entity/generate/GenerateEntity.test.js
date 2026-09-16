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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GenerateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WHOIS_DOMAIN_MONITORING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WhoisDomainMonitoringSDK.test();
        const ent = testsdk.Generate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'generate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "generate", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "#ffffff", "kind": "query", "name": "bg", "orig": "bg", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "M", "kind": "query", "name": "ec_level", "orig": "ec_level", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "#000000", "kind": "query", "name": "fg", "orig": "fg", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": "png", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 512, "kind": "query", "name": "size", "orig": "size", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "example": "https://example.com", "kind": "query", "name": "url", "orig": "url", "reqd": true, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /qr", "json": "{\"operationId\":\"qrGenerate\",\"parameters\":[{\"description\":\"Text or URL to encode\",\"in\":\"query\",\"name\":\"url\",\"required\":true,\"schema\":{\"example\":\"https://example.com\",\"type\":\"string\"}},{\"description\":\"Output size in pixels (PNG) or viewBox units (SVG)\",\"in\":\"query\",\"name\":\"size\",\"required\":false,\"schema\":{\"default\":512,\"maximum\":2048,\"minimum\":128,\"type\":\"integer\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"png\",\"enum\":[\"png\",\"svg\"],\"type\":\"string\"}},{\"description\":\"Error correction level\",\"in\":\"query\",\"name\":\"ec_level\",\"required\":false,\"schema\":{\"default\":\"M\",\"enum\":[\"L\",\"M\",\"Q\",\"H\"],\"type\":\"string\"}},{\"description\":\"Foreground colour (hex)\",\"in\":\"query\",\"name\":\"fg\",\"required\":false,\"schema\":{\"default\":\"#000000\",\"example\":\"#000000\",\"type\":\"string\"}},{\"description\":\"Background colour (hex)\",\"in\":\"query\",\"name\":\"bg\",\"required\":false,\"schema\":{\"default\":\"#ffffff\",\"example\":\"#ffffff\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/svg+xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"QR code image\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request parameters\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/qr", "segments": [{ "lit": "qr" }], "select": { "exist": ["bg", "ec_level", "fg", "format", "size", "url"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "HELLO123", "kind": "query", "name": "data", "orig": "data", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "code128", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 120, "kind": "query", "name": "height", "orig": "height", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": "svg", "kind": "query", "name": "output", "orig": "output", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 400, "kind": "query", "name": "width", "orig": "width", "reqd": false, "type": "`$INTEGER`", "index$": 4 }] }, "contract": { "id": "GET /barcode", "json": "{\"operationId\":\"barcodeGenerate\",\"parameters\":[{\"description\":\"Data to encode\",\"in\":\"query\",\"name\":\"data\",\"required\":true,\"schema\":{\"example\":\"HELLO123\",\"type\":\"string\"}},{\"description\":\"Barcode symbology\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"code128\",\"enum\":[\"code128\",\"ean13\",\"ean8\",\"upca\",\"code39\",\"itf\"],\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"output\",\"required\":false,\"schema\":{\"default\":\"svg\",\"enum\":[\"svg\",\"png\"],\"type\":\"string\"}},{\"description\":\"Output width in pixels\",\"in\":\"query\",\"name\":\"width\",\"required\":false,\"schema\":{\"default\":400,\"type\":\"integer\"}},{\"description\":\"Output height in pixels\",\"in\":\"query\",\"name\":\"height\",\"required\":false,\"schema\":{\"default\":120,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/svg+xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Barcode image\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request parameters\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/barcode", "segments": [{ "lit": "barcode" }], "select": { "exist": ["data", "format", "height", "output", "width"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": true, "kind": "query", "name": "full_page", "orig": "full_page", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": "https://example.com", "kind": "query", "name": "url", "orig": "url", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1280, "kind": "query", "name": "width", "orig": "width", "reqd": false, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /screenshot", "json": "{\"operationId\":\"screenshotCapture\",\"parameters\":[{\"description\":\"URL to screenshot\",\"in\":\"query\",\"name\":\"url\",\"required\":true,\"schema\":{\"example\":\"https://example.com\",\"format\":\"uri\",\"type\":\"string\"}},{\"description\":\"Viewport width in pixels\",\"in\":\"query\",\"name\":\"width\",\"required\":false,\"schema\":{\"default\":1280,\"type\":\"integer\"}},{\"description\":\"Capture full scrollable page\",\"in\":\"query\",\"name\":\"full_page\",\"required\":false,\"schema\":{\"default\":true,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"PNG screenshot\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"X-API-Key header required\",\"signup_url\":\"https://kiprio.com/signup\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{\"ApiKeyHeader\":[]}],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/screenshot", "segments": [{ "lit": "screenshot" }], "select": { "exist": ["full_page", "url", "width"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "generate", "name__orig": "generate", "Name": "Generate", "name_": "generate", "name-": "generate", "NAME": "GENERATE", "index$": 3 }, { "active": true, "entity": "generate", "key$": "BasicGenerateFlow", "kind": "basic", "name": "BasicGenerateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "generate_ref01", "srcdatavar": "generate_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-generate_ref01" } }], "index$": 0 }] }, 'Generate');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let generate_ref01_data = Object.values(setup.data.existing.generate)[0];
        // LOAD
        const generate_ref01_ent = client.Generate();
        const generate_ref01_match_dt0 = {};
        const generate_ref01_data_dt0 = (await generate_ref01_ent.load(generate_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != generate_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/generate/GenerateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WhoisDomainMonitoringSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['generate01', 'generate02', 'generate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID': idmap,
        'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
        'WHOIS_DOMAIN_MONITORING_APIKEY': '',
    });
    idmap = env['WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID'];
    const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID'];
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
//# sourceMappingURL=GenerateEntity.test.js.map