defmodule CreativeWeb.Router do
  use CreativeWeb, :router

  def http_headers(conn, _opts) do
    Plug.Conn.merge_resp_headers(
      conn,
      # Below is the default from November 2020 but not yet in Safari as in Jan/2022.
      # https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
      [
        {"referrer-policy", "strict-origin-when-cross-origin"},
        {"x-content-type-options", "nosniff"},
        # Applies only to Internet Explorer, can safely be removed in the future.
        {"x-download-options", "noopen"},
        # {"x-frame-options", "SAMEORIGIN"},
        {"x-permitted-cross-domain-policies", "none"},
        {"content-security-policy", "frame-ancestors https://tell.nu http://localhost:*;"}
      ]
    )
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {CreativeWeb.Layouts, :root}
    plug :protect_from_forgery

    plug :http_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CreativeWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/noise", PageController, :noise
    get "/polygon", PageController, :polygon
    get "/hull", PageController, :hull
  end

  # Other scopes may use custom stacks.
  # scope "/api", CreativeWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:creative, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: CreativeWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
