# WhoisDomainMonitoring SDK utility: prepare_body
require_relative 'media'
module WhoisDomainMonitoringUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WhoisDomainMonitoringUtilities.raw_body(ctx.reqdata) if WhoisDomainMonitoringUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
