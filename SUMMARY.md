# Kiprio API

30+ utility APIs for domain intelligence, email validation, SSL inspection, image generation, content processing, and more. Free tier included, no credit card required. Base URL: `https://kiprio.com/v1` Authentication: Pass your API key in the `X-API-Key` header. Get a free key at https://kiprio.com/signup

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### DnsResult

Results: DNS records.

SDK operations: `load`.

### Domain

Results: Parsed robots.txt.

SDK operations: `list`.

### EmailValidate

Results: Validation result.

SDK operations: `load`.

Key fields to recognise:

- `suggest`: Suggested correction for typos

### Generate

Results: QR code image; Barcode image; PNG screenshot.

SDK operations: `load`.

### Grammar

Results: Grammar check results.

SDK operations: `create`.

Key fields to recognise:

- `language`: BCP 47 language tag
- `text`: Text to check

### Ipn

Results: IP geolocation data.

SDK operations: `load`.

### Redact

Results: Redacted text.

SDK operations: `create`.

Key fields to recognise:

- `entities`: Include detected entity positions in response
- `redact`: Comma-separated PII types to redact.
- `text`: Text to redact

### Ssl

Results: SSL certificate data.

SDK operations: `list`.

### Utility

Results: Hash result.

SDK operations: `load`.

### Whoi

Results: WHOIS data.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| DnsResult | `load` | `GET /dns-lookup` | Required |
| Domain | `list` | `GET /robots-txt` | Required |
| EmailValidate | `load` | `GET /email-validate` | Required |
| Generate | `load` | `GET /qr` | Not required |
| Generate | `load` | `GET /barcode` | Not required |
| Generate | `load` | `GET /screenshot` | Required |
| Grammar | `create` | `POST /grammar` | Required |
| Ipn | `load` | `GET /ip` | Not required |
| Redact | `create` | `POST /redact` | Required |
| Ssl | `list` | `GET /ssl` | Required |
| Utility | `load` | `GET /hash` | Not required |
| Whoi | `list` | `GET /whois` | Required |

## Connect to the API

- Production: `https://kiprio.com/v1`

The default credential is sent in the `X-API-Key` header.

Get your free API key at https://kiprio.com/signup

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /ip`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://kiprio.com/v1/ip'
```

Inspect the response using the Ipn reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `whois-domain-monitoring_list`: List records for an entity. Supported entities: `domain`, `ssl`, `whoi`.
- `whois-domain-monitoring_load`: Load one record for an entity. Supported entities: `dns_result`, `email_validate`, `generate`, `ipn`, `utility`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

