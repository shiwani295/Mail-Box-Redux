import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Header/Navbar";
import Signupform from "./Components/Layout/Authentication/Signupform";
import Home from "./Components/Layout/Page/Home";
import Maildashboard from "./Components/Layout/Mail/Maildashboard";
import Forgotpassword from "./Components/Layout/Page/Forgotpassword";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signupform />} />
        <Route path="*" element={<Signupform />} />
        <Route path="/dashboard" element={<Maildashboard />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </>
  );
}

export default App;
