
import { Context } from './Context'


class WhoisDomainMonitoringError extends Error {

  isWhoisDomainMonitoringError = true

  sdk = 'WhoisDomainMonitoring'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  WhoisDomainMonitoringError
}

