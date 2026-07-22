<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK utility: result_body

class WhoisDomainMonitoringResultBody
{
    public static function call(WhoisDomainMonitoringContext $ctx): ?WhoisDomainMonitoringResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
