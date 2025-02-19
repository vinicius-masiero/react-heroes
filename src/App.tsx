import { NavLink, Outlet } from "react-router-dom";
import Messages from "./components/Messages";

function App() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-slate-700">
        React Heroes
      </h1>
      <nav className="mt-2 bg-slate-200 p-1">
        <ul className="my-3 flex justify-center gap-4 text-2xl font-semibold uppercase">
          <li>
            <NavLink to="/dashboard" className="[&.active]:text-blue-500">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/heroes" end className="[&.active]:text-blue-500">
              Heroes
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="container mx-auto mt-5 flex justify-between gap-6">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <Messages />
        </div>
      </div>
    </>
  );
}

export default App;
