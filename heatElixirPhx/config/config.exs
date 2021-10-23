# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :heat,
  ecto_repos: [Heat.Repo]

# Configures the endpoint
config :heat, HeatWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "vinAPuQpEUWG6IJar73uzGdQhjGRCnkpNkTeFfjNV1l1ucKVvQ2nCBG8VxmIAuqR",
  render_errors: [view: HeatWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Heat.PubSub,
  live_view: [signing_salt: "cRAu4vkr"]


config :heat, Heat.Scheduler,
  jobs: [
  {"* * * * *", {Heat.Tags.Count, :call, []}}
]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
