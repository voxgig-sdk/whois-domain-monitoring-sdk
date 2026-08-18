package = "voxgig-sdk-whois-domain-monitoring"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/whois-domain-monitoring-sdk.git",
  tag = "lua/v0.0.1",
  dir = "whois-domain-monitoring-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Kiprio public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/whois-domain-monitoring-sdk",
  issues_url = "https://github.com/voxgig-sdk/whois-domain-monitoring-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "whois-domain-monitoring" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["whois-domain-monitoring_sdk"] = "whois-domain-monitoring_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
  }
}
