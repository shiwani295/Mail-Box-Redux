import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Header/Navbar";
import Signupform from "./Components/Layout/Authentication/Signupform";
import Home from "./Components/Layout/Page/Home";
import Maildashboard from "./Components/Layout/Mail/Maildashboard";
import Forgotpassword from "./Components/Layout/Page/Forgotpassword";
import Index from "./Components/Layout/Mail/Index";
import OpenMail from "./Components/Layout/Mail/OpenMail";
import MailBoard from "./Components/Layout/Mail/MailBoard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signupform />} />

        <Route path="/dashboard" element={<MailBoard />} />
        <Route path="/dashboard/send" element={<MailBoard />} />
        <Route path="/dashboard/inbox" element={<MailBoard />} />
        <Route path="/dashboard/openMail/:id" element={<OpenMail />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </>
  );
}
export default App;
/* <Route path="*" element={<Signupform />} /> */
