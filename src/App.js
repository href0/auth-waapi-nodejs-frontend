import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/verifyOtp" element={<VerifyOtp/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        {/* <Route path="/dashboard" element={<><Navbar/><Dashboard/></>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
