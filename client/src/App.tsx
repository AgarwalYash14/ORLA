import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Orla from "./pages/Orla";
import Header from "./layout/Header";

function App() {
    return (
        <>
            <div className="bg-primary sticky top-0 z-50 w-full">
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/orla" element={<Orla />} />
            </Routes>
        </>
    );
}

export default App;
