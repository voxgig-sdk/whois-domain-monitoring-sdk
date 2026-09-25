

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


describe('UtilityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Utility()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'utility.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"algo":{"a":true,"h":"Algo","n":"algo","r":false,"t":"`$STRING`","key$":"algo","index$":0},"hash":{"a":true,"h":"Hash","n":"hash","r":false,"t":"`$STRING`","key$":"hash","index$":1},"input":{"a":true,"h":"Input","n":"input","r":false,"t":"`$STRING`","key$":"input","index$":2},"length":{"a":true,"h":"Length","n":"length","r":false,"t":"`$INTEGER`","key$":"length","index$":3}},"name":"utility","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /hash","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"sha256","k":"query","n":"algo","or":"algo","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"hello world","k":"query","n":"input","or":"input","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/hash","q":{"exist":["algo","input"]},"r":{},"s":[{"lit":"hash"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"utility","name__orig":"utility","Name":"Utility","name_":"utility","name-":"utility","NAME":"UTILITY","index$":8}, {"active":true,"entity":"utility","key$":"BasicUtilityFlow","kind":"basic","name":"BasicUtilityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"utility_ref01","srcdatavar":"utility_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-utility_ref01"}}],"index$":0}]}, 'Utility', {"GET /hash":{"protocol":"http","operationId":"hashGet","responses":{"200":{"description":"Hash result","content":{"application/json":{"schema":{"type":"object","properties":{"input":{"key$":"input","type":"string"},"algo":{"key$":"algo","type":"string"},"hash":{"key$":"hash","type":"string"},"length":{"key$":"length","type":"integer"}},"index$":0}}}}},"parameters":[{"name":"input","in":"query","required":true,"schema":{"type":"string","example":"hello world"},"description":"String to hash","index$":0},{"name":"algo","in":"query","required":false,"schema":{"type":"string","enum":["md5","sha1","sha256","sha384","sha512","sha3-256","sha3-512"],"default":"sha256"},"description":"Hash algorithm","index$":1}],"security":[],"securitySource":"operation","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let utility_ref01_data = Object.values(setup.data.existing.utility)[0] as any

    // LOAD
    const utility_ref01_ent = client.Utility()
    const utility_ref01_match_dt0: any = {}
    const utility_ref01_data_dt0 = (await utility_ref01_ent.load(utility_ref01_match_dt0)).data()
    assert(null != utility_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/utility/UtilityTestData.json')

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
    ['utility01','utility02','utility03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_UTILITY_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_UTILITY_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_UTILITY_ENTID']
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
  
