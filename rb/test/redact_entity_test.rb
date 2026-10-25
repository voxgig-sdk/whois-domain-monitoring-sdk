# Redact entity test

require "minitest/autorun"
require "json"
require_relative "../WhoisDomainMonitoring_sdk"
require_relative "runner"

class RedactEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WhoisDomainMonitoringSDK.test(nil, nil)
    ent = testsdk.Redact(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WhoisDomainMonitoringConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WhoisDomainMonitoringSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Redact(nil).create({ "redact" => 1, "text" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = redact_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "redact." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    redact_ref01_ent = client.Redact(nil)
    redact_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.redact"), "redact_ref01"))

    redact_ref01_data_result = redact_ref01_ent.create(redact_ref01_data, nil)
    redact_ref01_data = Helpers.to_map(redact_ref01_data_result.respond_to?(:data_get) ? redact_ref01_data_result.data_get : redact_ref01_data_result)
    assert !redact_ref01_data.nil?

  end
end

def redact_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "redact", "RedactTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WhoisDomainMonitoringSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["redact01", "redact02", "redact03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID" => idmap,
    "WHOIS_DOMAIN_MONITORING_TEST_LIVE" => "FALSE",
    "WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN" => "FALSE",
    "WHOIS_DOMAIN_MONITORING_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WHOIS_DOMAIN_MONITORING_TEST_REDACT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["WHOIS_DOMAIN_MONITORING_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["WHOIS_DOMAIN_MONITORING_APIKEY"],
      },
      extra || {},
    ])
    client = WhoisDomainMonitoringSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["WHOIS_DOMAIN_MONITORING_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
