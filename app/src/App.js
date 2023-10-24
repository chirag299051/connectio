import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from "./components/errorBoundary";
import { PageComponent } from "./layouts/PageComponent";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route
            errorElement={<ErrorBoundary />}
            element={
              <PageComponent>
                <Outlet />
              </PageComponent>
            }
          >
            <Route element={<Home />} path="/" />
            <Route element={<Profile />} path="/profile/:username" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Messenger />} path="/messenger" />
          </Route>
        )
      )}
    />
  );
}

export default App;
