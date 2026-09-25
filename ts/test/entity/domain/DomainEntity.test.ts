

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


describe('DomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Domain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agents":{"a":true,"h":"Agents","n":"agents","r":false,"t":"`$OBJECT`","key$":"agents","index$":0},"sitemaps":{"a":true,"h":"Sitemaps","n":"sitemaps","r":false,"t":"`$ARRAY`","key$":"sitemaps","index$":1},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":2}},"name":"domain","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /robots-txt","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"https://example.com","k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/robots-txt","q":{"exist":["url"]},"r":{},"s":[{"lit":"robots-txt"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"domain","name__orig":"domain","Name":"Domain","name_":"domain","name-":"domain","NAME":"DOMAIN","index$":1}, {"active":true,"entity":"domain","key$":"BasicDomainFlow","kind":"basic","name":"BasicDomainFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domain_ref01"}}],"index$":0}]}, 'Domain', {"GET /robots-txt":{"protocol":"http","operationId":"robotsTxtParse","responses":{"200":{"description":"Parsed robots.txt","content":{"application/json":{"schema":{"type":"object","properties":{"url":{"key$":"url","type":"string"},"sitemaps":{"items":{"type":"string"},"key$":"sitemaps","type":"array"},"agents":{"additionalProperties":{"properties":{"allow":{"items":{"type":"string"},"type":"array"},"disallow":{"items":{"type":"string"},"type":"array"}},"type":"object"},"key$":"agents","type":"object"}},"index$":0}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"url","in":"query","required":true,"schema":{"type":"string","example":"https://example.com"},"description":"Domain URL to fetch robots.txt from","index$":0}],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let domain_ref01_data = Object.values(setup.data.existing.domain)[0] as any

    // LIST
    const domain_ref01_ent = client.Domain()
    const domain_ref01_match: any = {}

    const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/domain/DomainTestData.json')

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
    ['domain01','domain02','domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_DOMAIN_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_DOMAIN_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_DOMAIN_ENTID']
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
  
