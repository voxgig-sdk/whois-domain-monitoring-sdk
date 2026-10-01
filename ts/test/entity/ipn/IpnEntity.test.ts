

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"asn":{"a":true,"h":"Asn","n":"asn","r":false,"t":"`$STRING`","key$":"asn","index$":0},"city":{"a":true,"h":"City","n":"city","r":false,"t":"`$STRING`","key$":"city","index$":1},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":2},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":false,"t":"`$STRING`","key$":"country_code","index$":3},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"t":"`$STRING`","key$":"ip","index$":4},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"t":"`$NUMBER`","key$":"latitude","index$":5},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"t":"`$NUMBER`","key$":"longitude","index$":6},"org":{"a":true,"h":"Org","n":"org","r":false,"t":"`$STRING`","key$":"org","index$":7},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":false,"t":"`$STRING`","key$":"timezone","index$":8}},"name":"ipn","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /ip","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"8.8.8.8","k":"query","n":"ip","or":"ip","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ip","q":{"exist":["ip"]},"r":{},"s":[{"lit":"ip"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ipn","name__orig":"ipn","Name":"Ipn","name_":"ipn","name-":"ipn","NAME":"IPN","index$":5}, {"active":true,"entity":"ipn","key$":"BasicIpnFlow","kind":"basic","name":"BasicIpnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ipn_ref01","srcdatavar":"ipn_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ipn_ref01"}}],"index$":0}]}, 'Ipn', {"GET /ip":{"protocol":"http","parameters":[{"name":"ip","in":"query","required":false,"schema":{"type":"string","example":"8.8.8.8"},"description":"IP address to look up. Omit for caller's IP.","index$":0}]}})
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
  
