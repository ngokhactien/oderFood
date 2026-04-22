import { useState } from "react";
import "../styles/Auth.css";
import Login from "../components/account/Login";
import Register from "../components/account/Register";
import Forgot from "../components/account/Forgot";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth">
      <div className="card">
        {mode === "login" && <Login setMode={setMode} />}
        {mode === "register" && <Register setMode={setMode} />}
        {mode === "forgot" && <Forgot setMode={setMode} />}
      </div>
    </div>
  );
}