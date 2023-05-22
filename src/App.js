import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Header/Navbar";
import Signupform from "./Components/Layout/Authentication/Signupform";
import Home from "./Components/Layout/Page/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signupform />} />
      </Routes>
    </>
  );
}

export default App;
