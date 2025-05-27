import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { FilePreview } from "./pages/filepreview";
import { NonexistentFile } from "./pages/nonexistentfile";
import { ErrorPage } from "./pages/errorpage";
import "./styles/app.css";
import "./styles/filepreview.css";
import "./styles/homepage.css";
import "./styles/nonexistentfile.css";

export const App = () => {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/preview/:filename" element={<FilePreview />} />
                    <Route path="/nonexistentfile" element={<NonexistentFile />} />
                    <Route path="/error" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>
    );
};
