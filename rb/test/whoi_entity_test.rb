# Whoi entity test

require "minitest/autorun"
require "json"
require_relative "../WhoisDomainMonitoring_sdk"
require_relative "runner"

class WhoiEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WhoisDomainMonitoringSDK.test(nil, nil)
    ent = testsdk.Whoi(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "whoi" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = WhoisDomainMonitoringSDK.test(seed, nil).Whoi(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "whoi" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = WhoisDomainMonitoringSDK.test(seed, nil)
    seen = base.Whoi(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = WhoisDomainMonitoringConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = WhoisDomainMonitoringSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Whoi(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < WhoisDomainMonitoringBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "whoi hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      WhoisDomainMonitoringSDK.test(offline, nil).Whoi(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    WhoisDomainMonitoringSDK.test(offline, nil).Whoi(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = WhoisDomainMonitoringConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = WhoisDomainMonitoringSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Whoi(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    WhoisDomainMonitoringSDK.test(nil, nil).Whoi(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = WhoisDomainMonitoringSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Whoi(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Whoi(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = WhoisDomainMonitoringConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = WhoisDomainMonitoringSDK.test({ "entity" => { "whoi" => { "v1" => {  } } } }, opts).Whoi(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
    err = assert_raises(StandardError) do
      WhoisDomainMonitoringSDK.test({ "entity" => { "whoi" => { "v1" => { "created" => 1 } } } }, opts).Whoi(nil).list(nil, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_validate
    cfg = WhoisDomainMonitoringConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WhoisDomainMonitoringSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Whoi(nil).list({ "domain" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = whoi_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "whoi." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    whoi_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.whoi")))
    whoi_ref01_data = nil
    if whoi_ref01_data_raw.length > 0
      whoi_ref01_data = Helpers.to_map(whoi_ref01_data_raw[0][1])
    end

    # LIST
    whoi_ref01_ent = client.Whoi(nil)
    whoi_ref01_match = {}

    whoi_ref01_list_result = whoi_ref01_ent.list(whoi_ref01_match, nil)
    assert whoi_ref01_list_result.is_a?(Array)

  end
end

def whoi_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "whoi", "WhoiTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WhoisDomainMonitoringSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["whoi01", "whoi02", "whoi03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID" => idmap,
    "WHOIS_DOMAIN_MONITORING_TEST_LIVE" => "FALSE",
    "WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN" => "FALSE",
    "WHOIS_DOMAIN_MONITORING_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WHOIS_DOMAIN_MONITORING_TEST_WHOI_ENTID"])
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
