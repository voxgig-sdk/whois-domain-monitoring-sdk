<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WhoisDomainMonitoringFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WhoisDomainMonitoringBaseFeature();
            case "test":
                return new WhoisDomainMonitoringTestFeature();
            default:
                return new WhoisDomainMonitoringBaseFeature();
        }
    }
}
