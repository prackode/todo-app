import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

// components
import Navbar from "./components/utils/Navbar.jsx";
import Sidebar from "./components/utils/Sidebar.jsx";
import AllTodos from "./components/todos/TodoList.jsx";
import PendingTodos from "./components/todos/PendingTodos.jsx";
import CompletedTodos from "./components/todos/CompletedTodos.jsx";
import Profile from "./components/profile/Profile.jsx";
import NotFound from './components/NotFound.jsx';

// Toast messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<MainContainer />}>
        <Route index element={<Home />} />
        <Route path="/todos" element={<AllTodos />} />
        <Route path="/pending-todos" element={<PendingTodos />} />
        <Route path="/completed-todos" element={<CompletedTodos />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

const MainContainer = () => (
  <>
    <Navbar />
    <div className="main-container">
      <Sidebar />
      <div className="content-container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/todos" element={<AllTodos />} />
          <Route path="/pending-todos" element={<PendingTodos />} />
          <Route path="/completed-todos" element={<CompletedTodos />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  </>
);

export default App;