

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WhoisDomainMonitoringSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('ssl hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WhoisDomainMonitoringSDK.test(offline).Ssl().stream('list')) { }
    }, /offline/)

    for await (const _item of WhoisDomainMonitoringSDK.test(offline).Ssl()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WhoisDomainMonitoringSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Ssl().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WhoisDomainMonitoringSDK.test().Ssl().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WhoisDomainMonitoringSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Ssl().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Ssl().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WhoisDomainMonitoringSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Ssl().list({"domain":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ssl.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cipher":{"a":true,"h":"Cipher","n":"cipher","r":false,"t":"`$STRING`","key$":"cipher","index$":0},"days_remaining":{"a":true,"h":"Days Remaining","n":"days_remaining","r":false,"t":"`$INTEGER`","key$":"days_remaining","index$":1},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":2},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":false,"t":"`$STRING`","key$":"expires_at","index$":3},"grade":{"a":true,"h":"Grade","n":"grade","r":false,"t":"`$STRING`","key$":"grade","index$":4},"issuer":{"a":true,"h":"Issuer","n":"issuer","r":false,"t":"`$STRING`","key$":"issuer","index$":5},"protocol":{"a":true,"h":"Protocol","n":"protocol","r":false,"t":"`$STRING`","key$":"protocol","index$":6},"sans":{"a":true,"h":"Sans","n":"sans","r":false,"t":"`$ARRAY`","key$":"sans","index$":7},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"t":"`$STRING`","key$":"subject","index$":8},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"t":"`$BOOLEAN`","key$":"valid","index$":9}},"name":"ssl","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /ssl","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"example.com","k":"query","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":443,"k":"query","n":"port","or":"port","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/ssl","q":{"exist":["domain"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"ssl"}],"t":{"req":"`reqdata`","res":"`body.sans`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ssl","name__orig":"ssl","Name":"Ssl","name_":"ssl","name-":"ssl","NAME":"SSL","index$":7}, {"active":true,"entity":"ssl","key$":"BasicSslFlow","kind":"basic","name":"BasicSslFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ssl_ref01"}}],"index$":0}]}, 'Ssl', {"GET /ssl":{"protocol":"http","parameters":[{"name":"domain","in":"query","required":true,"schema":{"type":"string","example":"example.com"},"description":"Domain to inspect","index$":0},{"name":"port","in":"query","required":false,"schema":{"type":"integer","default":443,"example":443},"description":"Port to connect on","index$":1}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
