import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            {/* courses */}
          </>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <main className="h-screen">
        <RouterProvider router={appRouter} />
      </main>
    </>
  );
}

export default App;
