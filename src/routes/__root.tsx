import { createRootRouteWithContext, Outlet, HeadContent, Scripts, useRouter, Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { VideoIntro } from "@/components/VideoIntro";
import { useState, createContext, useContext } from "react";

export const VisibilityContext = createContext({ isVisible: false });
export const useVisibility = () => useContext(VisibilityContext);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
        <Link to="/" className="mt-6 inline-block px-5 py-2 bg-[var(--ember)] text-[var(--accent-foreground)] text-xs uppercase tracking-[0.2em] font-mono">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-display text-3xl">Something broke.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 px-5 py-2 bg-[var(--ember)] text-[var(--accent-foreground)] text-xs uppercase tracking-[0.2em] font-mono">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "royalfinity technology — Digital growth, simplified." },
      { name: "description", content: "Web, app, branding, AI and marketing — royalfinity technology builds what your business needs to grow." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <VisibilityContext.Provider value={{ isVisible: !showIntro }}>
        {showIntro && <VideoIntro onComplete={() => setShowIntro(false)} />}
        <SmoothScroll />
        <Cursor />
        <Nav />
        <div className={`transition-opacity duration-1500 ease-in-out ${showIntro ? "opacity-0" : "opacity-100"}`}>
          <Outlet />
        </div>
      </VisibilityContext.Provider>
    </QueryClientProvider>
  );
}
