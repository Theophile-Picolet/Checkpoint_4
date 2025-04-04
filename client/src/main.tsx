// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import Cave from "./pages/Cave";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./services/AuthContext";
import Degustation from "./pages/Degustation";
import Visite from "./pages/Visite";
import {
  getDegustation,
  getProportionId,
  getVin,
  getVinId,
  getVisite,
} from "./services/request";
import VinDetail from "./components/VinDetail";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => ({
          vin: await getVin(),
        }),
      },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/cave",
        element: <Cave />,
        loader: async () => ({
          vin: await getVin(),
        }),
      },
      {
        path: "/vin/:id",
        element: <VinDetail />,
        loader: async ({ params }) => ({
          vinID: await getVinId(Number(params.id)),
          proportionId: await getProportionId(Number(params.id)),
          vins: await getVin(),
        }),
      },
      {
        path: "/degustation",
        element: <Degustation />,
        loader: async () => ({
          degustation: await getDegustation(),
        }),
      },
      {
        path: "/visite",
        element: <Visite />,
        loader: async () => ({
          visite: await getVisite(),
        }),
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
