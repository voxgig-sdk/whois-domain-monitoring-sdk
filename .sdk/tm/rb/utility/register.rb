# WhoisDomainMonitoring SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WhoisDomainMonitoringUtility.registrar = ->(u) {
  u.clean = WhoisDomainMonitoringUtilities::Clean
  u.done = WhoisDomainMonitoringUtilities::Done
  u.make_error = WhoisDomainMonitoringUtilities::MakeError
  u.feature_add = WhoisDomainMonitoringUtilities::FeatureAdd
  u.feature_hook = WhoisDomainMonitoringUtilities::FeatureHook
  u.feature_init = WhoisDomainMonitoringUtilities::FeatureInit
  u.fetcher = WhoisDomainMonitoringUtilities::Fetcher
  u.make_fetch_def = WhoisDomainMonitoringUtilities::MakeFetchDef
  u.make_context = WhoisDomainMonitoringUtilities::MakeContext
  u.make_options = WhoisDomainMonitoringUtilities::MakeOptions
  u.make_request = WhoisDomainMonitoringUtilities::MakeRequest
  u.make_response = WhoisDomainMonitoringUtilities::MakeResponse
  u.make_result = WhoisDomainMonitoringUtilities::MakeResult
  u.make_point = WhoisDomainMonitoringUtilities::MakePoint
  u.make_spec = WhoisDomainMonitoringUtilities::MakeSpec
  u.make_url = WhoisDomainMonitoringUtilities::MakeUrl
  u.param = WhoisDomainMonitoringUtilities::Param
  u.prepare_auth = WhoisDomainMonitoringUtilities::PrepareAuth
  u.prepare_body = WhoisDomainMonitoringUtilities::PrepareBody
  u.prepare_headers = WhoisDomainMonitoringUtilities::PrepareHeaders
  u.prepare_method = WhoisDomainMonitoringUtilities::PrepareMethod
  u.prepare_params = WhoisDomainMonitoringUtilities::PrepareParams
  u.prepare_path = WhoisDomainMonitoringUtilities::PreparePath
  u.prepare_query = WhoisDomainMonitoringUtilities::PrepareQuery
  u.graphql_body = WhoisDomainMonitoringUtilities::GraphqlBody
  u.graphql_errors = WhoisDomainMonitoringUtilities::GraphqlErrors
  u.result_basic = WhoisDomainMonitoringUtilities::ResultBasic
  u.result_body = WhoisDomainMonitoringUtilities::ResultBody
  u.result_headers = WhoisDomainMonitoringUtilities::ResultHeaders
  u.transform_request = WhoisDomainMonitoringUtilities::TransformRequest
  u.transform_response = WhoisDomainMonitoringUtilities::TransformResponse
}
