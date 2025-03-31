import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
