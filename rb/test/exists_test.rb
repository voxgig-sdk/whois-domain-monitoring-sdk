# WhoisDomainMonitoring SDK exists test

require "minitest/autorun"
require_relative "../WhoisDomainMonitoring_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WhoisDomainMonitoringSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
