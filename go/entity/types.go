// Typed models for the WhoisDomainMonitoring SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/whois-domain-monitoring-sdk/go/core"
)

// DnsResult is the typed data model for the dns_result entity.
type DnsResult struct {
}

// DnsResultLoadMatch is the typed request payload for DnsResult.LoadTyped.
type DnsResultLoadMatch struct {
	Domain string `json:"domain"`
	Type *string `json:"type,omitempty"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	Url string `json:"url"`
}

// EmailValidate is the typed data model for the email_validate entity.
type EmailValidate struct {
}

// EmailValidateLoadMatch is the typed request payload for EmailValidate.LoadTyped.
type EmailValidateLoadMatch struct {
	Email string `json:"email"`
}

// Generate is the typed data model for the generate entity.
type Generate struct {
}

// GenerateLoadMatch is the typed request payload for Generate.LoadTyped.
type GenerateLoadMatch struct {
	Bg *string `json:"bg,omitempty"`
	EcLevel *string `json:"ec_level,omitempty"`
	Fg *string `json:"fg,omitempty"`
	Format *string `json:"format,omitempty"`
	Size *int `json:"size,omitempty"`
	Url string `json:"url"`
}

// Grammar is the typed data model for the grammar entity.
type Grammar struct {
}

// GrammarCreateData is the typed request payload for Grammar.CreateTyped.
type GrammarCreateData struct {
	CorrectionCount *int `json:"correction_count,omitempty"`
	Corrections *[]any `json:"corrections,omitempty"`
	Language *string `json:"language,omitempty"`
	Text *string `json:"text,omitempty"`
}

// Ipn is the typed data model for the ipn entity.
type Ipn struct {
}

// IpnLoadMatch is the typed request payload for Ipn.LoadTyped.
type IpnLoadMatch struct {
	Ip *string `json:"ip,omitempty"`
}

// Redact is the typed data model for the redact entity.
type Redact struct {
}

// RedactCreateData is the typed request payload for Redact.CreateTyped.
type RedactCreateData struct {
	Counts *map[string]any `json:"counts,omitempty"`
	Entities *[]any `json:"entities,omitempty"`
	OriginalLength *int `json:"original_length,omitempty"`
	Redact *string `json:"redact,omitempty"`
	Redacted *string `json:"redacted,omitempty"`
	Text string `json:"text"`
}

// Ssl is the typed data model for the ssl entity.
type Ssl struct {
}

// SslListMatch is the typed request payload for Ssl.ListTyped.
type SslListMatch struct {
	Domain string `json:"domain"`
	Port *int `json:"port,omitempty"`
}

// Utility is the typed data model for the utility entity.
type Utility struct {
}

// UtilityLoadMatch is the typed request payload for Utility.LoadTyped.
type UtilityLoadMatch struct {
	Algo *string `json:"algo,omitempty"`
	Input string `json:"input"`
}

// Whoi is the typed data model for the whoi entity.
type Whoi struct {
}

// WhoiListMatch is the typed request payload for Whoi.ListTyped.
type WhoiListMatch struct {
	Domain string `json:"domain"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
