import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ScrollToTop from "./common/ScrollToTop";
// import Footer from "./components/Footer"; // nếu có

const App = () => {
  return (
    <>
    <ScrollToTop />
      <Header />
      <main style={{ minHeight: "80vh", paddingTop: '4rem' }}>
        <Outlet /> {/* Các trang con sẽ hiển thị tại đây */}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;