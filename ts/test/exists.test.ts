
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WhoisDomainMonitoringSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await WhoisDomainMonitoringSDK.test()
    equal(null !== testsdk, true)
  })

})
