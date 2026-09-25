

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


describe('GrammarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Grammar()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'grammar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"correction_count":{"a":true,"h":"Correction Count","n":"correction_count","r":false,"t":"`$INTEGER`","key$":"correction_count","index$":0},"corrections":{"a":true,"h":"Corrections","n":"corrections","r":false,"t":"`$ARRAY`","key$":"corrections","index$":1},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"BCP 47 language tag","t":"`$STRING`","key$":"language","index$":2},"text":{"a":true,"h":"Text","n":"text","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Text to check","t":"`$STRING`","key$":"text","index$":3}},"name":"grammar","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /grammar","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/grammar","q":{},"r":{},"s":[{"lit":"grammar"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"grammar","name__orig":"grammar","Name":"Grammar","name_":"grammar","name-":"grammar","NAME":"GRAMMAR","index$":4}, {"active":true,"entity":"grammar","key$":"BasicGrammarFlow","kind":"basic","name":"BasicGrammarFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"grammar_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Grammar', {"POST /grammar":{"protocol":"http","operationId":"grammarCheck","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["text"],"properties":{"text":{"type":"string","example":"Teh cat sat on teh mat.","description":"Text to check","key$":"text"},"language":{"type":"string","default":"en-US","example":"en-GB","description":"BCP 47 language tag","key$":"language"}},"index$":1}},"application/x-www-form-urlencoded":{"schema":{"type":"object","required":["text"],"properties":{"text":{"type":"string"}}}}}},"responses":{"200":{"description":"Grammar check results","content":{"application/json":{"schema":{"type":"object","properties":{"text":{"type":"string","key$":"text"},"language":{"type":"string","key$":"language"},"corrections":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"},"short_message":{"type":"string"},"context":{"type":"object","properties":{"text":{"type":"string"},"offset":{"type":"integer"},"length":{"type":"integer"}}},"replacements":{"type":"array","items":{"type":"string"}},"rule_id":{"type":"string"},"rule_desc":{"type":"string"},"category":{"type":"string"}}},"key$":"corrections"},"correction_count":{"type":"integer","key$":"correction_count"}},"x-ref":"#/components/schemas/GrammarResult","index$":0}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const grammar_ref01_ent = client.Grammar()
    let grammar_ref01_data = setup.data.new.grammar['grammar_ref01']

    grammar_ref01_data = (await grammar_ref01_ent.create(grammar_ref01_data)).data()
    assert(null != grammar_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/grammar/GrammarTestData.json')

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
    ['grammar01','grammar02','grammar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID']
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
  
