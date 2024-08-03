import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListComponent from "./components/ListComponent";
import ViewDetailComponent from "./components/ViewDetailComponent";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<ListComponent />} />
        <Route path="/view/:id" element={<ViewDetailComponent />} />
      </Routes>
    </>
  );
}

export default App;
