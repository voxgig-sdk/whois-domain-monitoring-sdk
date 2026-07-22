<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK utility: result_headers

class WhoisDomainMonitoringResultHeaders
{
    public static function call(WhoisDomainMonitoringContext $ctx): ?WhoisDomainMonitoringResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
