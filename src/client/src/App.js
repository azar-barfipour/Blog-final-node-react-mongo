import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Location from "./pages/Location";
import Edit from "./components/post/Edit";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/location" element={<Location />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home/:id/edit" element={<Edit />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
