import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Header/Navbar";
import Signupform from "./Components/Layout/Authentication/Signupform";
import Home from "./Components/Layout/Page/Home";
import Maildashboard from "./Components/Layout/Mail/Maildashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signupform />} />
        <Route path="*" element={<Signupform />} />
        <Route path="/dashboard" element={<Maildashboard />} />
      </Routes>
    </>
  );
}

export default App;
