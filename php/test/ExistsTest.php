<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK exists test

require_once __DIR__ . '/../whoisdomainmonitoring_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = WhoisDomainMonitoringSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
