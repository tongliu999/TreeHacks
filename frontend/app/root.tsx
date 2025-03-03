import {
  Form,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/navbar";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Context, type GlobalState } from "./context";
import { QueryClient, QueryClientProvider } from "react-query";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const queryClient = new QueryClient();

export function Layout({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalState>({
    userId: "Alex",
    homeCourses: [],
  });

  // run once on mount
  // NOTE: infinite loop! do not use
  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const homeCourses = localStorage.getItem("homeCourses");
  //   const home = localStorage.getItem("home");
  //   if (userId) {
  //     setState((state) => ({ ...state, userId }));
  //   }
  //   if (homeCourses) {
  //     setState((state) => ({ ...state, homeCourses: JSON.parse(homeCourses) }));
  //   }
  //   if (home) {
  //     setState((state) => ({ ...state, home: JSON.parse(home) }));
  //   }
  // });
  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ state, setState }}>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
          </head>
          <body className="flex flex-col h-full">
            <Navbar />
            <div className="flex flex-col pt-8 pb-4 px-12 items-center h-full">
              {children}
            </div>
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
