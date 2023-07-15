import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Onboarding, Compiler, Profile, Submissions } from "./pages";
import PrivateComponent from "./components/PrivateComponent";
import './App.css';
import Submission from './pages/Submission/Submission';


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Onboarding />} />
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Compiler />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/submissions" element={<Submissions />} />
            <Route path="/user/submission/:id" element={<Submission />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App