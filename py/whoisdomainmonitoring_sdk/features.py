# WhoisDomainMonitoring SDK feature factory

from whoisdomainmonitoring_sdk.feature.base_feature import WhoisDomainMonitoringBaseFeature
from whoisdomainmonitoring_sdk.feature.ratelimit_feature import WhoisDomainMonitoringRatelimitFeature
from whoisdomainmonitoring_sdk.feature.retry_feature import WhoisDomainMonitoringRetryFeature
from whoisdomainmonitoring_sdk.feature.test_feature import WhoisDomainMonitoringTestFeature
from whoisdomainmonitoring_sdk.feature.timeout_feature import WhoisDomainMonitoringTimeoutFeature


_FEATURES = {
    "base": lambda: WhoisDomainMonitoringBaseFeature(),
    "ratelimit": lambda: WhoisDomainMonitoringRatelimitFeature(),
    "retry": lambda: WhoisDomainMonitoringRetryFeature(),
    "test": lambda: WhoisDomainMonitoringTestFeature(),
    "timeout": lambda: WhoisDomainMonitoringTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
