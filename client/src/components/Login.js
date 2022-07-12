import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../config/Userservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const success = (data) =>
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    const failure = (data) =>
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };
    // console.log(data);

    const loginUsers = (event) => {
        event.preventDefault();
        loginUser(data).then((res) => {
            if (res.data.flag === 1) {
                success(res.data.message);
                console.log(res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("_token", JSON.stringify(res.data.token));
                navigate("/home");
            } else if (res.data.flag === 0) {
                failure(res.data.message);
            } else if (res.data.err === 0) {
                failure(res.data.message);
            }
        });
    };

    return (
        <div>
            <Container style={{ width: "50%" }} className="text-center mt-5">
                <FontAwesomeIcon icon={faUserCheck} size="4x" />
                <Form className="mt-4" onSubmit={(e) => loginUsers(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={(e) => handler(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handler(e)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit">
                            Login
                        </Button>
                    </div>

                    {/* <div className="mt-2">
                        <a href="/forgotpassword">
                            <small className="text-dark">
                                Forgot Password?
                            </small>
                        </a>
                    </div> */}

                    <div className="mt-2">
                        <a href="/register">
                            <small className="text-dark">
                                Not Registered? Sign Up
                            </small>
                        </a>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
