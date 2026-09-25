

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"t":"`$STRING`","key$":"created","index$":0},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":1},"expires":{"a":true,"fo":"date-time","h":"Expires","n":"expires","r":false,"t":"`$STRING`","key$":"expires","index$":2},"nameservers":{"a":true,"h":"Nameservers","n":"nameservers","r":false,"t":"`$ARRAY`","key$":"nameservers","index$":3},"registered":{"a":true,"h":"Registered","n":"registered","r":false,"t":"`$BOOLEAN`","key$":"registered","index$":4},"registrar":{"a":true,"h":"Registrar","n":"registrar","r":false,"t":"`$STRING`","key$":"registrar","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$ARRAY`","key$":"status","index$":6},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":false,"t":"`$STRING`","key$":"updated","index$":7}},"name":"whoi","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /whois","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example.com","k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/whois","q":{"exist":["domain"]},"r":{},"s":[{"lit":"whois"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"whoi","name__orig":"whoi","Name":"Whoi","name_":"whoi","name-":"whoi","NAME":"WHOI","index$":9}, {"active":true,"entity":"whoi","key$":"BasicWhoiFlow","kind":"basic","name":"BasicWhoiFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"whoi_ref01"}}],"index$":0}]}, 'Whoi', {"GET /whois":{"protocol":"http","operationId":"whoisLookup","responses":{"200":{"description":"WHOIS data","content":{"application/json":{"schema":{"type":"object","properties":{"domain":{"example":"example.com","key$":"domain","type":"string"},"registered":{"key$":"registered","nullable":true,"type":"boolean"},"registrar":{"key$":"registrar","nullable":true,"type":"string"},"status":{"items":{"type":"string"},"key$":"status","type":"array"},"created":{"format":"date-time","key$":"created","nullable":true,"type":"string"},"updated":{"format":"date-time","key$":"updated","nullable":true,"type":"string"},"expires":{"format":"date-time","key$":"expires","nullable":true,"type":"string"},"nameservers":{"items":{"type":"string"},"key$":"nameservers","type":"array"}},"x-ref":"#/components/schemas/WhoisResult","index$":0},"example":{"domain":"example.com","registered":true,"registrar":"RESERVED-Internet Assigned Numbers Authority","status":["client delete prohibited"],"created":"1995-08-14T04:00:00Z","updated":"2023-08-14T07:01:34Z","expires":"2024-08-13T04:00:00Z","nameservers":["a.iana-servers.net","b.iana-servers.net"]}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFound"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"domain","in":"query","required":true,"schema":{"type":"string","example":"example.com"},"description":"Domain name to look up","index$":0}],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
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
  
