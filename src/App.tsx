import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import PassengerMap from "./pages/PassengerMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map/passenger" element={<PassengerMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
