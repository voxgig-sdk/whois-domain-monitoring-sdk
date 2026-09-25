

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WhoisDomainMonitoringSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SslEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Ssl()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ssl.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cipher":{"a":true,"h":"Cipher","n":"cipher","r":false,"t":"`$STRING`","key$":"cipher","index$":0},"days_remaining":{"a":true,"h":"Days Remaining","n":"days_remaining","r":false,"t":"`$INTEGER`","key$":"days_remaining","index$":1},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":2},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"t":"`$STRING`","key$":"expires_at","index$":3},"grade":{"a":true,"h":"Grade","n":"grade","r":false,"t":"`$STRING`","key$":"grade","index$":4},"issuer":{"a":true,"h":"Issuer","n":"issuer","r":false,"t":"`$STRING`","key$":"issuer","index$":5},"protocol":{"a":true,"h":"Protocol","n":"protocol","r":false,"t":"`$STRING`","key$":"protocol","index$":6},"sans":{"a":true,"h":"Sans","n":"sans","r":false,"t":"`$ARRAY`","key$":"sans","index$":7},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"t":"`$STRING`","key$":"subject","index$":8},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"t":"`$BOOLEAN`","key$":"valid","index$":9}},"name":"ssl","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /ssl","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example.com","k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":443,"k":"query","n":"port","or":"port","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/ssl","q":{"exist":["domain","port"]},"r":{},"s":[{"lit":"ssl"}],"t":{"req":"`reqdata`","res":"`body.sans`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ssl","name__orig":"ssl","Name":"Ssl","name_":"ssl","name-":"ssl","NAME":"SSL","index$":7}, {"active":true,"entity":"ssl","key$":"BasicSslFlow","kind":"basic","name":"BasicSslFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ssl_ref01"}}],"index$":0}]}, 'Ssl', {"GET /ssl":{"protocol":"http","operationId":"sslCheck","responses":{"200":{"description":"SSL certificate data","content":{"application/json":{"schema":{"type":"object","properties":{"domain":{"key$":"domain","type":"string"},"valid":{"key$":"valid","type":"boolean"},"issuer":{"key$":"issuer","nullable":true,"type":"string"},"subject":{"key$":"subject","nullable":true,"type":"string"},"sans":{"items":{"type":"string"},"key$":"sans","type":"array"},"expires_at":{"format":"date-time","key$":"expires_at","nullable":true,"type":"string"},"days_remaining":{"key$":"days_remaining","type":"integer"},"protocol":{"example":"TLSv1.3","key$":"protocol","nullable":true,"type":"string"},"grade":{"example":"A","key$":"grade","type":"string"},"cipher":{"key$":"cipher","nullable":true,"type":"string"}},"x-ref":"#/components/schemas/SslResult","index$":0},"example":{"domain":"example.com","valid":true,"issuer":"DigiCert Inc","subject":"example.com","sans":["example.com","www.example.com"],"expires_at":"2025-01-15T12:00:00Z","days_remaining":180,"protocol":"TLSv1.3","grade":"A","cipher":"TLS_AES_256_GCM_SHA384"}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"domain","in":"query","required":true,"schema":{"type":"string","example":"example.com"},"description":"Domain to inspect","index$":0},{"name":"port","in":"query","required":false,"schema":{"type":"integer","default":443,"example":443},"description":"Port to connect on","index$":1}],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ssl_ref01_data = Object.values(setup.data.existing.ssl)[0] as any

    // LIST
    const ssl_ref01_ent = client.Ssl()
    const ssl_ref01_match: any = {}

    const ssl_ref01_list = (await ssl_ref01_ent.list(ssl_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ssl/SslTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WhoisDomainMonitoringSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ssl01','ssl02','ssl03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_SSL_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_SSL_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_SSL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WhoisDomainMonitoringSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
