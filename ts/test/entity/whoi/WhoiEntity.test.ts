

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


describe('WhoiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Whoi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'whoi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"domain","req":false,"type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"expires","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"nameservers","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"registered","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"name":"registrar","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"status","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"format":"date-time","name":"updated","req":false,"type":"`$STRING`","index$":7}],"name":"whoi","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"example.com","kind":"query","name":"domain","orig":"domain","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /whois","json":"{\"operationId\":\"whoisLookup\",\"parameters\":[{\"description\":\"Domain name to look up\",\"in\":\"query\",\"name\":\"domain\",\"required\":true,\"schema\":{\"example\":\"example.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"created\":\"1995-08-14T04:00:00Z\",\"domain\":\"example.com\",\"expires\":\"2024-08-13T04:00:00Z\",\"nameservers\":[\"a.iana-servers.net\",\"b.iana-servers.net\"],\"registered\":true,\"registrar\":\"RESERVED-Internet Assigned Numbers Authority\",\"status\":[\"client delete prohibited\"],\"updated\":\"2023-08-14T07:01:34Z\"},\"schema\":{\"properties\":{\"created\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"domain\":{\"example\":\"example.com\",\"type\":\"string\"},\"expires\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"nameservers\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"registered\":{\"nullable\":true,\"type\":\"boolean\"},\"registrar\":{\"nullable\":true,\"type\":\"string\"},\"status\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"updated\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"WHOIS data\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"X-API-Key header required\",\"signup_url\":\"https://kiprio.com/signup\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{\"ApiKeyHeader\":[]}],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/whois","segments":[{"lit":"whois"}],"select":{"exist":["domain"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"whoi","name__orig":"whoi","Name":"Whoi","name_":"whoi","name-":"whoi","NAME":"WHOI","index$":9}, {"active":true,"entity":"whoi","key$":"BasicWhoiFlow","kind":"basic","name":"BasicWhoiFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"whoi_ref01"}}],"index$":0}]}, 'Whoi')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let whoi_ref01_data = Object.values(setup.data.existing.whoi)[0] as any

    // LIST
    const whoi_ref01_ent = client.Whoi()
    const whoi_ref01_match: any = {}

    const whoi_ref01_list = (await whoi_ref01_ent.list(whoi_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/whoi/WhoiTestData.json')

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
    ['whoi01','whoi02','whoi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID']
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
  
