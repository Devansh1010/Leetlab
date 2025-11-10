import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/AdminSidebar.jsx";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-200 text-base-content">
 
   
        <Sidebar />


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
