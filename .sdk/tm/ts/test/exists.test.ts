
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WhoisDomainMonitoringSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WhoisDomainMonitoringSDK.test()
    equal(testsdk instanceof WhoisDomainMonitoringSDK, true,
      'WhoisDomainMonitoringSDK.test() must return a client synchronously')
  })

})
