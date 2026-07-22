-- WhoisDomainMonitoring SDK error

local WhoisDomainMonitoringError = {}
WhoisDomainMonitoringError.__index = WhoisDomainMonitoringError


function WhoisDomainMonitoringError.new(code, msg, ctx)
  local self = setmetatable({}, WhoisDomainMonitoringError)
  self.is_sdk_error = true
  self.sdk = "WhoisDomainMonitoring"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WhoisDomainMonitoringError:error()
  return self.msg
end


function WhoisDomainMonitoringError:__tostring()
  return self.msg
end


return WhoisDomainMonitoringError
