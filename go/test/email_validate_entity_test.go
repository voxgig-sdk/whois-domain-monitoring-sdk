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
const email_validateEntityLiveStrict = true


func TestEmailValidateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailValidate(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailValidateEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EmailValidate(nil).Load(map[string]any{"email": 1}, nil)
		if sdkerr, ok := err.(*core.WhoisDomainMonitoringError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := email_validateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_validate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		emailValidateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.email_validate")))
		var emailValidateRef01Data map[string]any
		if len(emailValidateRef01DataRaw) > 0 {
			emailValidateRef01Data = core.ToMapAny(emailValidateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailValidateRef01Data

		// LOAD
		emailValidateRef01Ent := client.EmailValidate(nil)
		emailValidateRef01MatchDt0 := map[string]any{}
		emailValidateRef01DataDt0Loaded, err := emailValidateRef01Ent.Load(emailValidateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if emailValidateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func email_validateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_validate", "EmailValidateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_validate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_validate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_validate01", "email_validate02", "email_validate03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID": idmap,
		"WHOIS_DOMAIN_MONITORING_TEST_LIVE":      "FALSE",
		"WHOIS_DOMAIN_MONITORING_TEST_EXPLAIN":   "FALSE",
		"WHOIS_DOMAIN_MONITORING_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WHOIS_DOMAIN_MONITORING_TEST_EMAIL_VALIDATE_ENTID"])
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
