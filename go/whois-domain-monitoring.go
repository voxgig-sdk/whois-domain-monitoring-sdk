package voxgigwhoisdomainmonitoringsdk

import (
	"github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/core"
	"github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/entity"
	"github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/feature"
	_ "github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/utility"
)

// Type aliases preserve external API.
type WhoisDomainMonitoringSDK = core.WhoisDomainMonitoringSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WhoisDomainMonitoringEntity = core.WhoisDomainMonitoringEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WhoisDomainMonitoringError = core.WhoisDomainMonitoringError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDnsResultEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewDnsResultEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewEmailValidateEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewEmailValidateEntity(client, entopts)
	}
	core.NewGenerateEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewGenerateEntity(client, entopts)
	}
	core.NewGrammarEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewGrammarEntity(client, entopts)
	}
	core.NewIpnEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewIpnEntity(client, entopts)
	}
	core.NewRedactEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewRedactEntity(client, entopts)
	}
	core.NewSslEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewSslEntity(client, entopts)
	}
	core.NewUtilityEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewUtilityEntity(client, entopts)
	}
	core.NewWhoiEntityFunc = func(client *core.WhoisDomainMonitoringSDK, entopts map[string]any) core.WhoisDomainMonitoringEntity {
		return entity.NewWhoiEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWhoisDomainMonitoringSDK = core.NewWhoisDomainMonitoringSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewWhoisDomainMonitoringSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *WhoisDomainMonitoringSDK  { return NewWhoisDomainMonitoringSDK(nil) }
func Test() *WhoisDomainMonitoringSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
