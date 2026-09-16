

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


describe('EmailValidateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.EmailValidate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_validate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"float","name":"confidence","req":false,"type":"`$NUMBER`","index$":0},{"active":true,"name":"disposable","req":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"format":"email","name":"email","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"free_provider","req":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"name":"mx_found","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"name":"role_based","req":false,"type":"`$BOOLEAN`","index$":5},{"active":true,"name":"suggest","req":false,"short":"Suggested correction for typos","type":"`$STRING`","index$":6},{"active":true,"name":"syntax_ok","req":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"name":"valid","req":false,"type":"`$BOOLEAN`","index$":8}],"name":"email_validate","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"user@example.com","kind":"query","name":"email","orig":"email","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /email-validate","json":"{\"operationId\":\"emailValidate\",\"parameters\":[{\"description\":\"Email address to validate\",\"in\":\"query\",\"name\":\"email\",\"required\":true,\"schema\":{\"example\":\"user@example.com\",\"format\":\"email\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"confidence\":0.95,\"disposable\":false,\"email\":\"user@example.com\",\"free_provider\":false,\"mx_found\":true,\"role_based\":false,\"suggest\":null,\"syntax_ok\":true,\"valid\":true},\"schema\":{\"properties\":{\"confidence\":{\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"},\"disposable\":{\"type\":\"boolean\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"free_provider\":{\"type\":\"boolean\"},\"mx_found\":{\"type\":\"boolean\"},\"role_based\":{\"type\":\"boolean\"},\"suggest\":{\"description\":\"Suggested correction for typos\",\"nullable\":true,\"type\":\"string\"},\"syntax_ok\":{\"type\":\"boolean\"},\"valid\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Validation result\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request parameters\"},\"401\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"X-API-Key header required\",\"signup_url\":\"https://kiprio.com/signup\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"rate limit: 30 req/min exceeded\"},\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"signup_url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\",\"headers\":{\"Retry-After\":{\"description\":\"Seconds until the rate limit resets\",\"schema\":{\"type\":\"integer\"}}}}},\"security\":[{\"ApiKeyHeader\":[]}],\"securitySchemes\":{\"ApiKeyHeader\":{\"description\":\"Get your free API key at https://kiprio.com/signup\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/email-validate","segments":[{"lit":"email-validate"}],"select":{"exist":["email"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_validate","name__orig":"email_validate","Name":"EmailValidate","name_":"email_validate","name-":"email-validate","NAME":"EMAIL_VALIDATE","index$":2}, {"active":true,"entity":"email_validate","key$":"BasicEmailValidateFlow","kind":"basic","name":"BasicEmailValidateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"email_validate_ref01","srcdatavar":"email_validate_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_validate_ref01"}}],"index$":0}]}, 'EmailValidate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_validate_ref01_data = Object.values(setup.data.existing.email_validate)[0] as any

    // LOAD
    const email_validate_ref01_ent = client.EmailValidate()
    const email_validate_ref01_match_dt0: any = {}
    const email_validate_ref01_data_dt0 = (await email_validate_ref01_ent.load(email_validate_ref01_match_dt0)).data()
    assert(null != email_validate_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_validate/EmailValidateTestData.json')

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
    ['email_validate01','email_validate02','email_validate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID']
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
  
