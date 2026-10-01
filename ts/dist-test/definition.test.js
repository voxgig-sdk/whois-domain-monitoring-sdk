"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "dns_result",
        "accessor": "DnsResult",
        "op": "load",
        "method": "GET",
        "path": "/dns-lookup",
        "args": [],
        "select": {
            "domain": "example.com",
            "type": "v1"
        },
        "headers": [],
        "query": [
            "domain",
            "types"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "domain": "example.com",
            "records": {
                "A": [
                    {
                        "value": "93.184.216.34",
                        "ttl": 3600
                    }
                ],
                "MX": [
                    {
                        "value": "mail.example.com",
                        "priority": 10,
                        "ttl": 3600
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "domain",
        "accessor": "Domain",
        "op": "list",
        "method": "GET",
        "path": "/robots-txt",
        "args": [],
        "select": {
            "url": "https://example.com"
        },
        "headers": [],
        "query": [
            "url"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "url": "x",
            "sitemaps": [
                "x"
            ],
            "agents": {}
        },
        "idField": "id"
    },
    {
        "entity": "email_validate",
        "accessor": "EmailValidate",
        "op": "load",
        "method": "GET",
        "path": "/email-validate",
        "args": [],
        "select": {
            "email": "user@example.com"
        },
        "headers": [],
        "query": [
            "email"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "email": "user@example.com",
            "valid": true,
            "syntax_ok": true,
            "mx_found": true,
            "disposable": false,
            "free_provider": false,
            "role_based": false,
            "suggest": null,
            "confidence": 0.95
        },
        "idField": "id"
    },
    {
        "entity": "generate",
        "accessor": "Generate",
        "op": "load",
        "method": "GET",
        "path": "/qr",
        "args": [],
        "select": {
            "bg": "#ffffff",
            "ec_level": "v1",
            "fg": "#000000",
            "format": "v1",
            "size": "v1",
            "url": "https://example.com"
        },
        "headers": [],
        "query": [
            "url",
            "size",
            "format",
            "ec_level",
            "fg",
            "bg"
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "generate",
        "accessor": "Generate",
        "op": "load",
        "method": "GET",
        "path": "/barcode",
        "args": [],
        "select": {
            "data": "HELLO123",
            "format": "v1",
            "height": "v1",
            "output": "v1",
            "width": "v1"
        },
        "headers": [],
        "query": [
            "data",
            "format",
            "output",
            "width",
            "height"
        ],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "generate",
        "accessor": "Generate",
        "op": "load",
        "method": "GET",
        "path": "/screenshot",
        "args": [],
        "select": {
            "full_page": "v1",
            "url": "https://example.com",
            "width": "v1"
        },
        "headers": [],
        "query": [
            "url",
            "width",
            "full_page"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "grammar",
        "accessor": "Grammar",
        "op": "create",
        "method": "POST",
        "path": "/grammar",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "text": "x",
            "language": "x",
            "corrections": [
                {
                    "message": "x",
                    "short_message": "x",
                    "context": {
                        "text": "x",
                        "offset": 1,
                        "length": 1
                    },
                    "replacements": [
                        "x"
                    ],
                    "rule_id": "x",
                    "rule_desc": "x",
                    "category": "x"
                }
            ],
            "correction_count": 1
        },
        "idField": "id"
    },
    {
        "entity": "ipn",
        "accessor": "Ipn",
        "op": "load",
        "method": "GET",
        "path": "/ip",
        "args": [],
        "select": {
            "ip": "8.8.8.8"
        },
        "headers": [],
        "query": [
            "ip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "ip": "8.8.8.8",
            "country": "United States",
            "country_code": "US",
            "city": "Mountain View",
            "latitude": 37.386,
            "longitude": -122.0838,
            "timezone": "America/Los_Angeles",
            "org": "AS15169 Google LLC",
            "asn": "AS15169"
        },
        "idField": "id"
    },
    {
        "entity": "redact",
        "accessor": "Redact",
        "op": "create",
        "method": "POST",
        "path": "/redact",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "original_length": 50,
            "redacted": "Call [NAME] on [PHONE] or email [EMAIL]",
            "counts": {
                "phone": 1,
                "email": 1
            },
            "entities": [
                {
                    "type": "phone",
                    "value": "07911 123456",
                    "offset": 15
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "ssl",
        "accessor": "Ssl",
        "op": "list",
        "method": "GET",
        "path": "/ssl",
        "args": [],
        "select": {
            "domain": "example.com",
            "port": 443
        },
        "headers": [],
        "query": [
            "domain",
            "port"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "domain": "example.com",
            "valid": true,
            "issuer": "DigiCert Inc",
            "subject": "example.com",
            "sans": [
                "example.com",
                "www.example.com"
            ],
            "expires_at": "2025-01-15T12:00:00Z",
            "days_remaining": 180,
            "protocol": "TLSv1.3",
            "grade": "A",
            "cipher": "TLS_AES_256_GCM_SHA384"
        },
        "idField": "id"
    },
    {
        "entity": "utility",
        "accessor": "Utility",
        "op": "load",
        "method": "GET",
        "path": "/hash",
        "args": [],
        "select": {
            "algo": "v1",
            "input": "hello world"
        },
        "headers": [],
        "query": [
            "input",
            "algo"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "input": "x",
            "algo": "x",
            "hash": "x",
            "length": 1
        },
        "idField": "id"
    },
    {
        "entity": "whoi",
        "accessor": "Whoi",
        "op": "list",
        "method": "GET",
        "path": "/whois",
        "args": [],
        "select": {
            "domain": "example.com"
        },
        "headers": [],
        "query": [
            "domain"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "domain": "example.com",
            "registered": true,
            "registrar": "RESERVED-Internet Assigned Numbers Authority",
            "status": [
                "client delete prohibited"
            ],
            "created": "1995-08-14T04:00:00Z",
            "updated": "2023-08-14T07:01:34Z",
            "expires": "2024-08-13T04:00:00Z",
            "nameservers": [
                "a.iana-servers.net",
                "b.iana-servers.net"
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map