<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WhoisDomainMonitoringMakeContext
{
    public static function call(array $ctxmap, ?WhoisDomainMonitoringContext $basectx): WhoisDomainMonitoringContext
    {
        return new WhoisDomainMonitoringContext($ctxmap, $basectx);
    }
}
