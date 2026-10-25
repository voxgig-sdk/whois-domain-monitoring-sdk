package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/whois-domain-monitoring-sdk/go"
	"github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/core"

	vs "github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const grammarEntityLiveStrict = true


func TestGrammarEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Grammar(nil)
		if ent == nil {
			t.Fatal("expected non-nil GrammarEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Grammar(nil).Create(map[string]any{"language": 1, "text": "x"}, nil)
		if sdkerr, ok := err.(*core.WhoisDomainMonitoringError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := grammarBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "grammar." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// CREATE
		grammarRef01Ent := client.Grammar(nil)
		grammarRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "grammar"}), "grammar_ref01"))

		grammarRef01DataResult, err := grammarRef01Ent.Create(grammarRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		grammarRef01Data = core.ToMapAny(entityData(grammarRef01DataResult))
		if grammarRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func grammarBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "grammar", "GrammarTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read grammar test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse grammar test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"grammar01", "grammar02", "grammar03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID": idmap,
		"WHOIS_DOMAIN_MONITORING_TEST_LIVE":      "FALSE",
		"WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN":   "FALSE",
		"WHOIS_DOMAIN_MONITORING_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WHOIS_DOMAIN_MONITORING_TEST_GRAMMAR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WHOIS_DOMAIN_MONITORING_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["WHOIS_DOMAIN_MONITORING_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewWhoisDomainMonitoringSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WHOIS_DOMAIN_MONITORING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
