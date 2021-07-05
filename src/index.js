import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-nhrpk2mn.eu.auth0.com"
    clientId="nEBRjV3L6HH7GHVwPkI3GDLxK3ZuBd5Y"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
