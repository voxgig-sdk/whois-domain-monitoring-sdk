<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK utility: prepare_path

class WhoisDomainMonitoringPreparePath
{
    public static function call(WhoisDomainMonitoringContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
