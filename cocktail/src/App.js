import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./pages/public/PublicRouter";
import AdminRouter from "./pages/admin/AdminRouter";
import AuthRouter from "./pages/auth/AuthRouter";
import AuthGuard from "./_helpers/AuthGuard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route
            path="/admin/*"
            element={
              <AuthGuard>
                <AdminRouter />
              </AuthGuard>
            }
          />
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
