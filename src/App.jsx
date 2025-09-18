import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Success from "./components/Success.jsx";
import "./App.css";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
