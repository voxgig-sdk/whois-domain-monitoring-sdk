<?php
declare(strict_types=1);

// WhoisDomainMonitoring SDK base feature

class WhoisDomainMonitoringBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WhoisDomainMonitoringContext $ctx, array $options): void {}
    public function PostConstruct(WhoisDomainMonitoringContext $ctx): void {}
    public function PostConstructEntity(WhoisDomainMonitoringContext $ctx): void {}
    public function SetData(WhoisDomainMonitoringContext $ctx): void {}
    public function GetData(WhoisDomainMonitoringContext $ctx): void {}
    public function GetMatch(WhoisDomainMonitoringContext $ctx): void {}
    public function SetMatch(WhoisDomainMonitoringContext $ctx): void {}
    public function PrePoint(WhoisDomainMonitoringContext $ctx): void {}
    public function PreSpec(WhoisDomainMonitoringContext $ctx): void {}
    public function PreRequest(WhoisDomainMonitoringContext $ctx): void {}
    public function PreResponse(WhoisDomainMonitoringContext $ctx): void {}
    public function PreResult(WhoisDomainMonitoringContext $ctx): void {}
    public function PreDone(WhoisDomainMonitoringContext $ctx): void {}
    public function PreUnexpected(WhoisDomainMonitoringContext $ctx): void {}
}
