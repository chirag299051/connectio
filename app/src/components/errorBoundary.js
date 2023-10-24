import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <h2>Page not found</h2>;
    if (error.status === 401) return <h2>Unauthorized</h2>;
  }

  return <div>Something went wrong</div>;
}
