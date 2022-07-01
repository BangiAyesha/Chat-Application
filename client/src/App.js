import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Messenger = lazy(() => import("./components/Messenger"));

function App() {
    return (
        <div>
            <Router>
                <Suspense
                    fallback={
                        <div className="text-center">
                            <Spinner
                                animation="grow"
                                size="lg"
                                variant="primary"
                            />
                            <Spinner animation="grow" variant="secondary" />
                            <Spinner animation="grow" variant="success" />
                            <Spinner animation="grow" variant="danger" />
                            <Spinner animation="grow" variant="warning" />
                            <Spinner animation="grow" variant="info" />
                            <Spinner animation="grow" variant="dark" />
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Messenger />} />
                    </Routes>
                </Suspense>
            </Router>
        </div>
    );
}

export default App;
