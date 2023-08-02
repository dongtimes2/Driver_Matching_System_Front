import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Passenger from "./pages/Passenger";
import Driver from "./pages/Driver";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map/passenger" element={<Passenger />} />
        <Route path="/map/driver" element={<Driver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
