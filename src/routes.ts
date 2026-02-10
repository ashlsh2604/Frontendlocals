import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LandingPageWithMap } from "./pages/LandingPageWithMap";
import { RequestPage } from "./pages/RequestPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ReportPage } from "./pages/ReportPage";
import { LocalLoginPage } from "./pages/LocalLoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LocalTasksPage } from "./pages/LocalTasksPage";
import { LocalUploadPage } from "./pages/LocalUploadPage";
import { PhotoUploadDemo } from "./pages/PhotoUploadDemo";
import { AddReviewPage } from "./pages/AddReviewPage";
import { ComponentsDemo } from "./pages/ComponentsDemo";
import { LocationUploadDemo } from "./pages/LocationUploadDemo";
import { CameraDiagnostics } from "./pages/CameraDiagnostics";
import { SimpleCameraTest } from "./pages/SimpleCameraTest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPageWithMap,
  },
  {
    path: "/original",
    Component: LandingPage,
  },
  {
    path: "/request",
    Component: RequestPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/report/:id",
    Component: ReportPage,
  },
  {
    path: "/add-review",
    Component: AddReviewPage,
  },
  {
    path: "/local/login",
    Component: LocalLoginPage,
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/local/tasks",
    Component: LocalTasksPage,
  },
  {
    path: "/local/upload/:taskId",
    Component: LocalUploadPage,
  },
  {
    path: "/demo/photo-upload",
    Component: PhotoUploadDemo,
  },
  {
    path: "/demo/components",
    Component: ComponentsDemo,
  },
  {
    path: "/demo/location-upload",
    Component: LocationUploadDemo,
  },
  {
    path: "/diagnostics",
    Component: CameraDiagnostics,
  },
  {
    path: "/camera-test",
    Component: SimpleCameraTest,
  },
]);