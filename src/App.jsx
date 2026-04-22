import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import ScrollToTop from "./common/ScrollToTop";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main
        style={{
          minHeight: "80vh",
          padding: "7rem 5rem",
          background: '#f5f5f5'
        }}
      >
        <Outlet /> {/* Các trang con sẽ hiển thị tại đây */}
      </main>
      <ToastContainer style={{ marginTop: "3.2rem" }} />
      <Footer />
    </>
  );
};

export default App;
