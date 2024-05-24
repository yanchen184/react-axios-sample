// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Example from "./components/Example";
import Whisper from "./components/Whisper";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/example">Example</Link>
            </li>
            <li>
              <Link to="/whisper">Whisper</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/example" element={<Example />} />
          <Route path="/whisper" element={<Whisper />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
