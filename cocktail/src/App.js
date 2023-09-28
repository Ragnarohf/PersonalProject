import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PublicRouter from "./pages/public/PublicRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PublicRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
