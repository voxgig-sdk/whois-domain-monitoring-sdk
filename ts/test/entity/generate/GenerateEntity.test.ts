

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


describe('GenerateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WHOIS_DOMAIN_MONITORING_TEST_LIVE=TRUE.
  afterEach(liveDelay('WHOIS_DOMAIN_MONITORING_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    const ent = testsdk.Generate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WHOIS_DOMAIN_MONITORING_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"generate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /qr","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"#ffffff","k":"query","n":"bg","or":"bg","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"M","k":"query","n":"ec_level","or":"ec_level","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"#000000","k":"query","n":"fg","or":"fg","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"png","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":512,"k":"query","n":"size","or":"size","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":"https://example.com","k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/qr","q":{"exist":["bg","ec_level","fg","format","size","url"]},"r":{},"s":[{"lit":"qr"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /barcode","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"HELLO123","k":"query","n":"data","or":"data","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"code128","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":120,"k":"query","n":"height","or":"height","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":"svg","k":"query","n":"output","or":"output","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":400,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/barcode","q":{"exist":["data","format","height","output","width"]},"r":{},"s":[{"lit":"barcode"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /screenshot","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":true,"k":"query","n":"full_page","or":"full_page","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"https://example.com","k":"query","n":"url","or":"url","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":1280,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/screenshot","q":{"exist":["full_page","url","width"]},"r":{},"s":[{"lit":"screenshot"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"generate","name__orig":"generate","Name":"Generate","name_":"generate","name-":"generate","NAME":"GENERATE","index$":3}, {"active":true,"entity":"generate","key$":"BasicGenerateFlow","kind":"basic","name":"BasicGenerateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"generate_ref01","srcdatavar":"generate_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-generate_ref01"}}],"index$":0}]}, 'Generate', {"GET /qr":{"protocol":"http","operationId":"qrGenerate","responses":{"200":{"description":"QR code image","content":{"image/png":{"schema":{"type":"string","format":"binary"}},"image/svg+xml":{"schema":{"type":"string"}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"url","in":"query","required":true,"schema":{"type":"string","example":"https://example.com"},"description":"Text or URL to encode","index$":0},{"name":"size","in":"query","required":false,"schema":{"type":"integer","default":512,"minimum":128,"maximum":2048},"description":"Output size in pixels (PNG) or viewBox units (SVG)","index$":1},{"name":"format","in":"query","required":false,"schema":{"type":"string","enum":["png","svg"],"default":"png"},"description":"Output format","index$":2},{"name":"ec_level","in":"query","required":false,"schema":{"type":"string","enum":["L","M","Q","H"],"default":"M"},"description":"Error correction level","index$":3},{"name":"fg","in":"query","required":false,"schema":{"type":"string","default":"#000000","example":"#000000"},"description":"Foreground colour (hex)","index$":4},{"name":"bg","in":"query","required":false,"schema":{"type":"string","default":"#ffffff","example":"#ffffff"},"description":"Background colour (hex)","index$":5}],"security":[],"securitySource":"operation","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /barcode":{"protocol":"http","operationId":"barcodeGenerate","responses":{"200":{"description":"Barcode image","content":{"image/svg+xml":{"schema":{"type":"string"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"data","in":"query","required":true,"schema":{"type":"string","example":"HELLO123"},"description":"Data to encode","index$":0},{"name":"format","in":"query","required":false,"schema":{"type":"string","enum":["code128","ean13","ean8","upca","code39","itf"],"default":"code128"},"description":"Barcode symbology","index$":1},{"name":"output","in":"query","required":false,"schema":{"type":"string","enum":["svg","png"],"default":"svg"},"description":"Output format","index$":2},{"name":"width","in":"query","required":false,"schema":{"type":"integer","default":400},"description":"Output width in pixels","index$":3},{"name":"height","in":"query","required":false,"schema":{"type":"integer","default":120},"description":"Output height in pixels","index$":4}],"security":[],"securitySource":"operation","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}},"GET /screenshot":{"protocol":"http","operationId":"screenshotCapture","responses":{"200":{"description":"PNG screenshot","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"400":{"description":"Invalid request parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequest"},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"X-API-Key header required","signup_url":"https://kiprio.com/signup"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded","headers":{"Retry-After":{"schema":{"type":"integer"},"description":"Seconds until the rate limit resets"}},"content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"signup_url":{"type":"string","format":"uri"}},"x-ref":"#/components/schemas/Error"},"example":{"error":"rate limit: 30 req/min exceeded"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"url","in":"query","required":true,"schema":{"type":"string","format":"uri","example":"https://example.com"},"description":"URL to screenshot","index$":0},{"name":"width","in":"query","required":false,"schema":{"type":"integer","default":1280},"description":"Viewport width in pixels","index$":1},{"name":"full_page","in":"query","required":false,"schema":{"type":"boolean","default":true},"description":"Capture full scrollable page","index$":2}],"security":[{"ApiKeyHeader":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyHeader":{"type":"apiKey","in":"header","name":"X-API-Key","description":"Get your free API key at https://kiprio.com/signup"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let generate_ref01_data = Object.values(setup.data.existing.generate)[0] as any

    // LOAD
    const generate_ref01_ent = client.Generate()
    const generate_ref01_match_dt0: any = {}
    const generate_ref01_data_dt0 = (await generate_ref01_ent.load(generate_ref01_match_dt0)).data()
    assert(null != generate_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generate/GenerateTestData.json')

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
    ['generate01','generate02','generate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID': idmap,
    'WHOIS_DOMAIN_MONITORING_TEST_LIVE': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN': 'FALSE',
    'WHOIS_DOMAIN_MONITORING_APIKEY': '',
  })

  idmap = env['WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID']

  const live = 'TRUE' === env.WHOIS_DOMAIN_MONITORING_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WHOIS_DOMAIN_MONITORING_TEST_GENERATE_ENTID']
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
  
