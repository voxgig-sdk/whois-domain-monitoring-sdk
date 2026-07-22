package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDnsResultEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewDomainEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewEmailValidateEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewGenerateEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewGrammarEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewIpnEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewRedactEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewSslEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewUtilityEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

var NewWhoiEntityFunc func(client *WhoisDomainMonitoringSDK, entopts map[string]any) WhoisDomainMonitoringEntity

