import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Main from "./pages/Main";
import "./styles/common.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
