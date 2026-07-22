# WhoisDomainMonitoring SDK utility: make_context
require_relative '../core/context'
module WhoisDomainMonitoringUtilities
  MakeContext = ->(ctxmap, basectx) {
    WhoisDomainMonitoringContext.new(ctxmap, basectx)
  }
end
