import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="my-32" id="error-page">
      <h1 className="font-bold text-6xl mb-8">Oops!</h1>
      <p className="font-bold text-3xl mb-6">Sorry, an unexpected error has occurred.</p>
      <p className="font-bold text-3xl mb-6">404</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <NavLink to="/" className="btn mt-2 text-black hover:bg-slate-400 bg-slate-400">Back to Home Page</NavLink>
    </div>
  );
}