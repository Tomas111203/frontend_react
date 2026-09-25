import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx';
import './index.css';

const oidcConfig = {
  authority: 'http://localhost:8081/realms/cybersecurity',
  client_id: 'fastapi-api',
  redirect_uri: window.location.origin + '/',
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: window.location.origin + '/',
  onSigninCallback: (_user) => {
    // Clean up code & state params from URL after Keycloak redirect
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  automaticSilentRenew: true,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
