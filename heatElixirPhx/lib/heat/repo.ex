defmodule Heat.Repo do
  use Ecto.Repo,
    otp_app: :heat,
    adapter: Ecto.Adapters.Postgres
end
