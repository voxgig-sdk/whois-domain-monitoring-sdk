

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cipher","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"days_remaining","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"domain","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"expires_at","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"grade","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"issuer","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"protocol","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"sans","req":false,"type":"`$ARRAY`","index$":7},{"active":true,"name":"subject","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"valid","req":false,"type":"`$BOOLEAN`","index$":9}],"name":"ssl","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"example.com","kind":"query","name":"domain","orig":"domain","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":443,"kind":"query","name":"port","orig":"port","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /ssl","json":"{\"operationId\":\"sslCheck\",\"parameters\":[{\"description\":\"Domain to inspect\",\"in\":\"query\",\"name\":\"domain\",\"required\":true,\"schema\":{\"example\":\"example.com\",\"type\":\"string\"}},{\"description\":\"Port to connect on\",\"in\":\"query\",\"name\":\"port\",\"required\":false,\"schema\":{\"default\":443,\"example\":443,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cipher\":\"TLS_AES_256_GCM_SHA384\",\"days_remaining\":180,\"domain\":\"example.com\",\"expires_at\":\"2025-01-15T12:00:00Z\",\"grade\":\"A\",\"issuer\":\"DigiCert Inc\",\"protocol\":\"TLSv1.3\",\"sans\":[\"example.com\",\"www.example.com\"],\"subject\":\"example.com\",\"valid\":true},\"schema\":{\"properties\":{\"cipher\":{\"nullable\":true,\"type\":\"string\"},\"days_remaining\":{\"type\":\"integer\"},\"domain\":{\"type\":\"string\"},\"expires_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"grade\":{\"example\":\"A\",\"type\":\"string\"},\"issuer\":{\"nullable\":true,\"type\":\"string\"},\"protocol\":{\"example\":\"TLSv1.3\",\"nullable\":true,\"type\":\"string\"},\"sans\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"subject\":{\"nullable\":true,\"type\":\"string\"},\"valid\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"SSL certificate data\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"X-API-Key header required\",\"signup_url\":\"https://kiprio.com/signup\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{\"ApiKeyHeader\":[]}],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ssl","segments":[{"lit":"ssl"}],"select":{"exist":["domain","port"]},"transform":{"req":"`reqdata`","res":"`body.sans`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ssl","name__orig":"ssl","Name":"Ssl","name_":"ssl","name-":"ssl","NAME":"SSL","index$":7}, {"active":true,"entity":"ssl","key$":"BasicSslFlow","kind":"basic","name":"BasicSslFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ssl_ref01"}}],"index$":0}]}, 'Ssl')
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
  
