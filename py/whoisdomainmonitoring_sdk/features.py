# WhoisDomainMonitoring SDK feature factory

from whoisdomainmonitoring_sdk.feature.base_feature import WhoisDomainMonitoringBaseFeature
from whoisdomainmonitoring_sdk.feature.test_feature import WhoisDomainMonitoringTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WhoisDomainMonitoringBaseFeature(),
        "test": lambda: WhoisDomainMonitoringTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
