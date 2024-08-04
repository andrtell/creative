defmodule CreativeWeb.PageController do
  use CreativeWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def noise(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :noise, layout: false)
  end

  def polygon(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :polygon, layout: false)
  end

  def hull(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :hull, layout: false)
  end
end
