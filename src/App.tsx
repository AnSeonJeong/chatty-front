import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Main from "./pages/Main";
import axios from "axios";
import "./styles/common.scss";
import Redirect from "./components/authentication/Redirect";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/:auth/*" element={<Authentication />} />
          <Route path="/main/:menu" element={<Main />} />
          <Route path="/redirect/:type" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
