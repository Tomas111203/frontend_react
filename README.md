# 💻 Frontend Module: React + Bootstrap + react-oidc-context

This directory contains the Single Page Application (SPA) built with **React 19**, styled using **Bootstrap 5**, and utilizing the **`react-oidc-context`** library for OAuth2 / OIDC token session management with Keycloak.

---

## 📂 Module Contents

- **`src/main.jsx`**: React entry point wrapping the app with `react-oidc-context`'s `<AuthProvider>` (configured for OAuth2 PKCE S256 flow).
- **`src/components/AddGamePage.jsx`**: **Dedicated standalone page** for adding and editing videogames with a responsive 5-attribute form.
- **`src/components/Dashboard.jsx`**: Main authenticated container with **automatic JWT Bearer token printing to the browser console (`console.log`) on every page/tab change**.
- **`src/components/JwtInspector.jsx`**: RS256 JWT inspector displaying Header, Claims payload, validity status, and a one-click copy button.
- **`src/components/VideogamesManager.jsx`**: API security verification test bench (200 OK Token test vs 401 Unauthorized Non-Token test) and full CRUD catalogue table.
- **`src/index.css`**: Dark mode cybersecurity design system featuring glassmorphism cards, custom gradients, and glowing status badges.
- **`Dockerfile`**: Multi-stage Nginx container build configuration serving the SPA on port `3000`.

---

## 🛠️ Local Development (Optional)

To run the frontend in local development mode:

```bash
# Install npm dependencies
npm install

# Start Vite development server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

---

## 🔑 Test LDAP Credentials
- **Alice**: `alice` / `alice123`
- **Bob**: `bob` / `bob123`
