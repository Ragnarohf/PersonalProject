import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./pages/public/PublicRouter";
import AdminRouter from "./pages/admin/AdminRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
