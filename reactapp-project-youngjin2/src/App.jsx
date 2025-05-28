import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Regist from './components/members/Regist';
import TopNavi from "./components/members/TopNavi";

export default function App() {

  return (<>
    <TopNavi />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
    </Routes>
  </>); 
}