<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK utility: prepare_body

class WhoisDomainMonitoringPrepareBody
{
    public static function call(WhoisDomainMonitoringContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
