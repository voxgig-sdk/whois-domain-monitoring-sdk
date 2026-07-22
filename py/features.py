# WhoisDomainMonitoring SDK feature factory

from feature.base_feature import WhoisDomainMonitoringBaseFeature
from feature.test_feature import WhoisDomainMonitoringTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WhoisDomainMonitoringBaseFeature(),
        "test": lambda: WhoisDomainMonitoringTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
