

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


describe('DnsResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.DnsResult()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dns_result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":0},"records":{"a":true,"h":"Records","n":"records","r":false,"t":"`$OBJECT`","key$":"records","index$":1}},"name":"dns_result","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /dns-lookup","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example.com","k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"A,MX,TXT","k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/dns-lookup","q":{"exist":["domain","type"]},"r":{},"s":[{"lit":"dns-lookup"}],"t":{"req":"`reqdata`","res":"`body.records`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"dns_result","name__orig":"dns_result","Name":"DnsResult","name_":"dns_result","name-":"dns-result","NAME":"DNS_RESULT","index$":0}, {"active":true,"entity":"dns_result","key$":"BasicDnsResultFlow","kind":"basic","name":"BasicDnsResultFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dns_result_ref01","srcdatavar":"dns_result_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dns_result_ref01"}}],"index$":0}]}, 'DnsResult', {"GET /dns-lookup":{"protocol":"http","operationId":"dnsLookup","responses":{"200":{"description":"DNS records","content":{"application/json":{"schema":{"type":"object","properties":{"domain":{"key$":"domain","type":"string"},"records":{"additionalProperties":{"items":{"properties":{"priority":{"description":"MX/SRV priority","type":"integer"},"ttl":{"type":"integer"},"value":{"type":"string"}},"type":"object"},"type":"array","key$":"additionalProperties"},"key$":"records","type":"object"}},"x-ref":"#/components/schemas/DnsResult"},"example":{"domain":"example.com","records":{"A":[{"value":"93.184.216.34","ttl":3600}],"MX":[{"value":"mail.example.com","priority":10,"ttl":3600}]}}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"domain","in":"query","required":true,"schema":{"type":"string","example":"example.com"},"description":"Domain to look up","index$":0},{"name":"types","in":"query","required":false,"schema":{"type":"string","example":"A,MX,TXT","default":"A,AAAA,MX,TXT,CNAME,NS"},"description":"Comma-separated list of record types to fetch","index$":1}],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dns_result_ref01_data = Object.values(setup.data.existing.dns_result)[0] as any

    // LOAD
    const dns_result_ref01_ent = client.DnsResult()
    const dns_result_ref01_match_dt0: any = {}
    const dns_result_ref01_data_dt0 = (await dns_result_ref01_ent.load(dns_result_ref01_match_dt0)).data()
    assert(null != dns_result_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dns_result/DnsResultTestData.json')

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
    ['dns_result01','dns_result02','dns_result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_DNS_RESULT_ENTID']
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
  
