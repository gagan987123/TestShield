// StudentDash.jsx

import React, { useState } from "react";
import Sidebar, { SidebarItem } from "../../components/MySidebar";
import { Home, User } from "lucide-react";
import NavBar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

const StudentDash = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <NavBar extended={expanded} />
      <div className="flex">
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
          <SidebarItem icon={<Home size={20} />} text="Home" to="." />
          <SidebarItem
            icon={<Home size={20} />}
            text="Tests"
            to="assignments"
          />
          <SidebarItem icon={<Home size={20} />} text="Announcements" to="a" />
          <SidebarItem icon={<User size={20} />} text="Profile" to="profile" />
        </Sidebar>

        <div
          className={`transition-all duration-300 flex-1 p-6 bg-gray-50 overflow-y-auto ${
            expanded ? "ml-64" : "ml-20"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default StudentDash;
