import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/mainPage";
import Editform from "./components/editForm/Editform";
import { ToastContainer } from "react-toastify";
//import DataContextProvider from "./components/DataContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users/:id" element={<Editform />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
