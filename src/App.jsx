import ScrollManager from "./components/ScrollManager";
import LoadingScreen from "./components/LoadingScreen";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";

import { teamLoader } from "./loaders/teamLoader";

const Teams = lazy(() => import("./components/Teams"));

const AboutUs = lazy(() => import("./pages/AboutUs"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const YouTubeShowcase = lazy(() => import("./components/YouTubeShowcase"));
const Contact = lazy(() => import("./pages/Contact"));
const Hero = lazy(() => import("./components/Hero"));
const FAQ = lazy(() => import("./pages/FAQ"));
const EnhancedBackground = lazy(() => import("./components/BackgroundEffects"));

const Layout = ({ children }) => {
  return (
    <>
      <ScrollManager />
      <EnhancedBackground />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Hero />
        <AboutUs />
        <Events />
        <Gallery />
        <YouTubeShowcase />
        <FAQ />
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/team",
    element: (
      <Layout>
        <Teams />
      </Layout>
    ),
    loader: teamLoader,
  },
  {
    path: "/junior-council",
    element: <Navigate to="/team" replace />,
  },
]);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}