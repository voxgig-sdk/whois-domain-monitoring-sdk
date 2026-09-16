# WhoisDomainMonitoring SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WhoisDomainMonitoringFeatures
  def self.make_feature(name)
    case name
    when "base"
      WhoisDomainMonitoringBaseFeature.new
    when "ratelimit"
      WhoisDomainMonitoringRatelimitFeature.new
    when "retry"
      WhoisDomainMonitoringRetryFeature.new
    when "test"
      WhoisDomainMonitoringTestFeature.new
    when "timeout"
      WhoisDomainMonitoringTimeoutFeature.new
    else
      WhoisDomainMonitoringBaseFeature.new
    end
  end
end
