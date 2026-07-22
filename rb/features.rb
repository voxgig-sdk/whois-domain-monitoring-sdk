# WhoisDomainMonitoring SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WhoisDomainMonitoringFeatures
  def self.make_feature(name)
    case name
    when "base"
      WhoisDomainMonitoringBaseFeature.new
    when "test"
      WhoisDomainMonitoringTestFeature.new
    else
      WhoisDomainMonitoringBaseFeature.new
    end
  end
end
