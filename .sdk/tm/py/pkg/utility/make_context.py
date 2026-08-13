# WhoisDomainMonitoring SDK utility: make_context

from projectname_sdk.core.context import WhoisDomainMonitoringContext


def make_context_util(ctxmap, basectx):
    return WhoisDomainMonitoringContext(ctxmap, basectx)
