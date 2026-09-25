package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WhoisDomainMonitoring",
			"slug": "whois-domain-monitoring",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://kiprio.com/v1",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-Key",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"dns_result": map[string]any{},
				"domain": map[string]any{},
				"email_validate": map[string]any{},
				"generate": map[string]any{},
				"grammar": map[string]any{},
				"ipn": map[string]any{},
				"redact": map[string]any{},
				"ssl": map[string]any{},
				"utility": map[string]any{},
				"whoi": map[string]any{},
			},
		},
		"entity": map[string]any{
			"dns_result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$OBJECT`",
					},
				},
				"name": "dns_result",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/dns-lookup",
								"segments": []any{
									map[string]any{
										"lit": "dns-lookup",
									},
								},
								"parts": []any{
									"dns-lookup",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.records`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "example.com",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "A,MX,TXT",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agents",
						"title": "Agents",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sitemaps",
						"title": "Sitemaps",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
					},
				},
				"name": "domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/robots-txt",
								"segments": []any{
									map[string]any{
										"lit": "robots-txt",
									},
								},
								"parts": []any{
									"robots-txt",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "https://example.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"url",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_validate": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$NUMBER`",
						"format": "float",
					},
					map[string]any{
						"name": "disposable",
						"title": "Disposable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "free_provider",
						"title": "Free Provider",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mx_found",
						"title": "Mx Found",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "role_based",
						"title": "Role Based",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "suggest",
						"title": "Suggest",
						"type": "`$STRING`",
						"short": "Suggested correction for typos",
					},
					map[string]any{
						"name": "syntax_ok",
						"title": "Syntax Ok",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "email_validate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/email-validate",
								"segments": []any{
									map[string]any{
										"lit": "email-validate",
									},
								},
								"parts": []any{
									"email-validate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "user@example.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"generate": map[string]any{
				"fields": []any{},
				"name": "generate",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/qr",
								"segments": []any{
									map[string]any{
										"lit": "qr",
									},
								},
								"parts": []any{
									"qr",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bg",
											"orig": "bg",
											"type": "`$STRING`",
											"kind": "query",
											"example": "#ffffff",
										},
										map[string]any{
											"name": "ec_level",
											"orig": "ec_level",
											"type": "`$STRING`",
											"kind": "query",
											"example": "M",
										},
										map[string]any{
											"name": "fg",
											"orig": "fg",
											"type": "`$STRING`",
											"kind": "query",
											"example": "#000000",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "png",
										},
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 512,
										},
										map[string]any{
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "https://example.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bg",
										"ec_level",
										"fg",
										"format",
										"size",
										"url",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/barcode",
								"segments": []any{
									map[string]any{
										"lit": "barcode",
									},
								},
								"parts": []any{
									"barcode",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "data",
											"orig": "data",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "HELLO123",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"example": "code128",
										},
										map[string]any{
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 120,
										},
										map[string]any{
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
											"kind": "query",
											"example": "svg",
										},
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 400,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"data",
										"format",
										"height",
										"output",
										"width",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/screenshot",
								"segments": []any{
									map[string]any{
										"lit": "screenshot",
									},
								},
								"parts": []any{
									"screenshot",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "full_page",
											"orig": "full_page",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": true,
										},
										map[string]any{
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "https://example.com",
										},
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1280,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"full_page",
										"url",
										"width",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"grammar": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "correction_count",
						"title": "Correction Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "corrections",
						"title": "Corrections",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
						"short": "BCP 47 language tag",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Text to check",
					},
				},
				"name": "grammar",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/grammar",
								"segments": []any{
									map[string]any{
										"lit": "grammar",
									},
								},
								"parts": []any{
									"grammar",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ipn": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn",
						"title": "Asn",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "org",
						"title": "Org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
					},
				},
				"name": "ipn",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ip",
								"segments": []any{
									map[string]any{
										"lit": "ip",
									},
								},
								"parts": []any{
									"ip",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "query",
											"example": "8.8.8.8",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"redact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "counts",
						"title": "Counts",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "entities",
						"title": "Entities",
						"type": "`$ARRAY`",
						"short": "Include detected entity positions in response",
					},
					map[string]any{
						"name": "original_length",
						"title": "Original Length",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "redact",
						"title": "Redact",
						"type": "`$STRING`",
						"short": "Comma-separated PII types to redact.",
					},
					map[string]any{
						"name": "redacted",
						"title": "Redacted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"req": true,
						"short": "Text to redact",
					},
				},
				"name": "redact",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/redact",
								"segments": []any{
									map[string]any{
										"lit": "redact",
									},
								},
								"parts": []any{
									"redact",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"redact": "`reqdata`",
									},
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ssl": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cipher",
						"title": "Cipher",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "days_remaining",
						"title": "Days Remaining",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "grade",
						"title": "Grade",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issuer",
						"title": "Issuer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protocol",
						"title": "Protocol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sans",
						"title": "Sans",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "ssl",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ssl",
								"segments": []any{
									map[string]any{
										"lit": "ssl",
									},
								},
								"parts": []any{
									"ssl",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.sans`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "example.com",
										},
										map[string]any{
											"name": "port",
											"orig": "port",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 443,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"port",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"utility": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "algo",
						"title": "Algo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hash",
						"title": "Hash",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "input",
						"title": "Input",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "length",
						"title": "Length",
						"type": "`$INTEGER`",
					},
				},
				"name": "utility",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/hash",
								"segments": []any{
									map[string]any{
										"lit": "hash",
									},
								},
								"parts": []any{
									"hash",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "algo",
											"orig": "algo",
											"type": "`$STRING`",
											"kind": "query",
											"example": "sha256",
										},
										map[string]any{
											"name": "input",
											"orig": "input",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "hello world",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"algo",
										"input",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whoi": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires",
						"title": "Expires",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "nameservers",
						"title": "Nameservers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "registered",
						"title": "Registered",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "registrar",
						"title": "Registrar",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "whoi",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/whois",
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
								},
								"parts": []any{
									"whois",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "example.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
