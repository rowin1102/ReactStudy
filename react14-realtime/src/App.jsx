import { BrowserRouter, Routes, Route } from "react-router-dom";

import RealtimeCRUD from './components/RealtimeCRUD';
// import Listener from './components/Listener';
// import ChatMessage from './components/ChatMessage';

export default function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RealtimeCRUD/>} />
        <Route path="/crud" element={<RealtimeCRUD/>} />
        {/* <Route path="/listener" element={<Listener/>} /> */}
        {/* <Route path="/chat">
          <Route index element={<ChatStart/>} />
          <Route path="talk" element={<ChatMessage/>} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  </>); 
}