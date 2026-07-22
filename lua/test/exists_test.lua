-- WhoisDomainMonitoring SDK exists test

local sdk = require("whois-domain-monitoring_sdk")

describe("WhoisDomainMonitoringSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
