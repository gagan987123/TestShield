import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/AuthUser";
const SidebarContext = createContext();

export default function Sidebar({ children, expanded, setExpanded }) {
  const { user, userId, isCheckingAuth, authCheck } = useAuthStore();
  return (
    <aside
      className={`fixed top-0 left-0 h-full z-10 bg-white shadow-sm border-r transition-all duration-300 ${
        expanded ? "w-64" : "w-12"
      }`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`text-2xl font-bold text-indigo-600 tracking-wide overflow-hidden transition-all ${
              expanded ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
          >
            TestShield
          </h1>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 px-0.5"
          >
            {expanded ? <ChevronFirst size={17} /> : <ChevronLast size={17} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src={`${user.base64Image}`}
            alt="User"
            className={`${
              expanded ? "w-10 h-10" : "w-7 h-7"
            } rounded-full bg-blue-500 transition-all duration-300`}
          />
          {expanded && (
            <div className="ml-3 leading-4 w-full flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <span className="text-xs text-gray-600">{user.email}</span>
              </div>
              <MoreVertical size={20} />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <li
        className={`
          relative flex items-center py-3 px-0 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-0 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
