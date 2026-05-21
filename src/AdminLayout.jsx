import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "./components/Dashboard/Sidebar";

import Header from "./components/Dashboard/Header";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./admin.css";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="admin">
      <Sidebar open={open} />

      <div className={`admin-main ${open ? "" : "full"}`}>
        <Header toggle={() => setOpen(!open)} />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
      />
    </div>
  );
};

export default AdminLayout;