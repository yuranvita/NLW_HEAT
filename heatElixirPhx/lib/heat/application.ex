defmodule Heat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Heat.Repo,
      # Start the Telemetry supervisor
      HeatWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Heat.PubSub},
      # Start the Endpoint (http/https)
      HeatWeb.Endpoint,
      # Start a worker by calling: Heat.Worker.start_link(arg)
      # {Heat.Worker, arg}
      Heat.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Heat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    HeatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
