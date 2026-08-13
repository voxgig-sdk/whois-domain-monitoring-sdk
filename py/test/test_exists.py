# WhoisDomainMonitoring SDK exists test

import pytest
from whoisdomainmonitoring_sdk import WhoisDomainMonitoringSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WhoisDomainMonitoringSDK.test(None, None)
        assert testsdk is not None
