

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


describe('IpnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Ipn()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ipn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"asn","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"city","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"country","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"country_code","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"ip","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"double","name":"latitude","req":false,"type":"`$NUMBER`","index$":5},{"active":true,"format":"double","name":"longitude","req":false,"type":"`$NUMBER`","index$":6},{"active":true,"name":"org","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"timezone","req":false,"type":"`$STRING`","index$":8}],"name":"ipn","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"8.8.8.8","kind":"query","name":"ip","orig":"ip","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /ip","json":"{\"operationId\":\"ipLookup\",\"parameters\":[{\"description\":\"IP address to look up. Omit for caller's IP.\",\"in\":\"query\",\"name\":\"ip\",\"required\":false,\"schema\":{\"example\":\"8.8.8.8\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"asn\":\"AS15169\",\"city\":\"Mountain View\",\"country\":\"United States\",\"country_code\":\"US\",\"ip\":\"8.8.8.8\",\"latitude\":37.386,\"longitude\":-122.0838,\"org\":\"AS15169 Google LLC\",\"timezone\":\"America/Los_Angeles\"},\"schema\":{\"properties\":{\"asn\":{\"nullable\":true,\"type\":\"string\"},\"city\":{\"nullable\":true,\"type\":\"string\"},\"country\":{\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"example\":\"US\",\"nullable\":true,\"type\":\"string\"},\"ip\":{\"example\":\"8.8.8.8\",\"type\":\"string\"},\"latitude\":{\"format\":\"double\",\"nullable\":true,\"type\":\"number\"},\"longitude\":{\"format\":\"double\",\"nullable\":true,\"type\":\"number\"},\"org\":{\"nullable\":true,\"type\":\"string\"},\"timezone\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"IP geolocation data\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ip","segments":[{"lit":"ip"}],"select":{"exist":["ip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ipn","name__orig":"ipn","Name":"Ipn","name_":"ipn","name-":"ipn","NAME":"IPN","index$":5}, {"active":true,"entity":"ipn","key$":"BasicIpnFlow","kind":"basic","name":"BasicIpnFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ipn_ref01","srcdatavar":"ipn_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ipn_ref01"}}],"index$":0}]}, 'Ipn')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ipn_ref01_data = Object.values(setup.data.existing.ipn)[0] as any

    // LOAD
    const ipn_ref01_ent = client.Ipn()
    const ipn_ref01_match_dt0: any = {}
    const ipn_ref01_data_dt0 = (await ipn_ref01_ent.load(ipn_ref01_match_dt0)).data()
    assert(null != ipn_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ipn/IpnTestData.json')

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
    ['ipn01','ipn02','ipn03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_IPN_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_IPN_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_IPN_ENTID']
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
  
