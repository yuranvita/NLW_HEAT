defmodule HeatWeb.MessageView do
  use HeatWeb, :view

  def render("create.json",%{message: message}) do
  %{
    result: "Message Created!",
    message: message
  }
  end

end
