<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK configuration

class WhoisDomainMonitoringConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WhoisDomainMonitoring",
                "slug" => "whois-domain-monitoring",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://kiprio.com/v1",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "dns_result" => [],
                    "domain" => [],
                    "email_validate" => [],
                    "generate" => [],
                    "grammar" => [],
                    "ipn" => [],
                    "redact" => [],
                    "ssl" => [],
                    "utility" => [],
                    "whoi" => [],
                ],
            ],
            "entity" => [
        'dns_result' => [
          'fields' => [
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'records',
              'title' => 'Records',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'dns_result',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/dns-lookup',
                  'segments' => [
                    [
                      'lit' => 'dns-lookup',
                    ],
                  ],
                  'parts' => [
                    'dns-lookup',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.records`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'example.com',
                      ],
                      [
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'A,MX,TXT',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                      'type',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'domain' => [
          'fields' => [
            [
              'name' => 'agents',
              'title' => 'Agents',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sitemaps',
              'title' => 'Sitemaps',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'domain',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/robots-txt',
                  'segments' => [
                    [
                      'lit' => 'robots-txt',
                    ],
                  ],
                  'parts' => [
                    'robots-txt',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'https://example.com',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'url',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_validate' => [
          'fields' => [
            [
              'name' => 'confidence',
              'title' => 'Confidence',
              'type' => '`$NUMBER`',
              'format' => 'float',
            ],
            [
              'name' => 'disposable',
              'title' => 'Disposable',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'format' => 'email',
            ],
            [
              'name' => 'free_provider',
              'title' => 'Free Provider',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'mx_found',
              'title' => 'Mx Found',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'role_based',
              'title' => 'Role Based',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'suggest',
              'title' => 'Suggest',
              'type' => '`$STRING`',
              'short' => 'Suggested correction for typos',
            ],
            [
              'name' => 'syntax_ok',
              'title' => 'Syntax Ok',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'email_validate',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/email-validate',
                  'segments' => [
                    [
                      'lit' => 'email-validate',
                    ],
                  ],
                  'parts' => [
                    'email-validate',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'user@example.com',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'generate' => [
          'fields' => [],
          'name' => 'generate',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/qr',
                  'segments' => [
                    [
                      'lit' => 'qr',
                    ],
                  ],
                  'parts' => [
                    'qr',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'bg',
                        'orig' => 'bg',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '#ffffff',
                      ],
                      [
                        'name' => 'ec_level',
                        'orig' => 'ec_level',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'M',
                      ],
                      [
                        'name' => 'fg',
                        'orig' => 'fg',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '#000000',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'png',
                      ],
                      [
                        'name' => 'size',
                        'orig' => 'size',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 512,
                      ],
                      [
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'https://example.com',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'bg',
                      'ec_level',
                      'fg',
                      'format',
                      'size',
                      'url',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/barcode',
                  'segments' => [
                    [
                      'lit' => 'barcode',
                    ],
                  ],
                  'parts' => [
                    'barcode',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'data',
                        'orig' => 'data',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'HELLO123',
                      ],
                      [
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'code128',
                      ],
                      [
                        'name' => 'height',
                        'orig' => 'height',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 120,
                      ],
                      [
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'svg',
                      ],
                      [
                        'name' => 'width',
                        'orig' => 'width',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 400,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'data',
                      'format',
                      'height',
                      'output',
                      'width',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/screenshot',
                  'segments' => [
                    [
                      'lit' => 'screenshot',
                    ],
                  ],
                  'parts' => [
                    'screenshot',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'full_page',
                        'orig' => 'full_page',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => true,
                      ],
                      [
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'https://example.com',
                      ],
                      [
                        'name' => 'width',
                        'orig' => 'width',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1280,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'full_page',
                      'url',
                      'width',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'grammar' => [
          'fields' => [
            [
              'name' => 'correction_count',
              'title' => 'Correction Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'corrections',
              'title' => 'Corrections',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'language',
              'title' => 'Language',
              'type' => '`$STRING`',
              'short' => 'BCP 47 language tag',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Text to check',
            ],
          ],
          'name' => 'grammar',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/grammar',
                  'segments' => [
                    [
                      'lit' => 'grammar',
                    ],
                  ],
                  'parts' => [
                    'grammar',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ipn' => [
          'fields' => [
            [
              'name' => 'asn',
              'title' => 'Asn',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'title' => 'Country Code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latitude',
              'title' => 'Latitude',
              'type' => '`$NUMBER`',
              'format' => 'double',
            ],
            [
              'name' => 'longitude',
              'title' => 'Longitude',
              'type' => '`$NUMBER`',
              'format' => 'double',
            ],
            [
              'name' => 'org',
              'title' => 'Org',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timezone',
              'title' => 'Timezone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'ipn',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ip',
                  'segments' => [
                    [
                      'lit' => 'ip',
                    ],
                  ],
                  'parts' => [
                    'ip',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '8.8.8.8',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ip',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'redact' => [
          'fields' => [
            [
              'name' => 'counts',
              'title' => 'Counts',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'entities',
              'title' => 'Entities',
              'type' => '`$ARRAY`',
              'short' => 'Include detected entity positions in response',
            ],
            [
              'name' => 'original_length',
              'title' => 'Original Length',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'redact',
              'title' => 'Redact',
              'type' => '`$STRING`',
              'short' => 'Comma-separated PII types to redact.',
            ],
            [
              'name' => 'redacted',
              'title' => 'Redacted',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'title' => 'Text',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Text to redact',
            ],
          ],
          'name' => 'redact',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/redact',
                  'segments' => [
                    [
                      'lit' => 'redact',
                    ],
                  ],
                  'parts' => [
                    'redact',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => [
                      'redact' => '`reqdata`',
                    ],
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ssl' => [
          'fields' => [
            [
              'name' => 'cipher',
              'title' => 'Cipher',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'days_remaining',
              'title' => 'Days Remaining',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'title' => 'Expires At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'grade',
              'title' => 'Grade',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'issuer',
              'title' => 'Issuer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'protocol',
              'title' => 'Protocol',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sans',
              'title' => 'Sans',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'subject',
              'title' => 'Subject',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'ssl',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/ssl',
                  'segments' => [
                    [
                      'lit' => 'ssl',
                    ],
                  ],
                  'parts' => [
                    'ssl',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.sans`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'example.com',
                      ],
                      [
                        'name' => 'port',
                        'orig' => 'port',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 443,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                      'port',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'utility' => [
          'fields' => [
            [
              'name' => 'algo',
              'title' => 'Algo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hash',
              'title' => 'Hash',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'input',
              'title' => 'Input',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'length',
              'title' => 'Length',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'utility',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/hash',
                  'segments' => [
                    [
                      'lit' => 'hash',
                    ],
                  ],
                  'parts' => [
                    'hash',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'algo',
                        'orig' => 'algo',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'sha256',
                      ],
                      [
                        'name' => 'input',
                        'orig' => 'input',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'hello world',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'algo',
                      'input',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whoi' => [
          'fields' => [
            [
              'name' => 'created',
              'title' => 'Created',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires',
              'title' => 'Expires',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'nameservers',
              'title' => 'Nameservers',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'registered',
              'title' => 'Registered',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'registrar',
              'title' => 'Registrar',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'updated',
              'title' => 'Updated',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
          ],
          'name' => 'whoi',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/whois',
                  'segments' => [
                    [
                      'lit' => 'whois',
                    ],
                  ],
                  'parts' => [
                    'whois',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'example.com',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WhoisDomainMonitoringFeatures::make_feature($name);
    }
}
