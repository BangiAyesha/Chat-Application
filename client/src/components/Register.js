import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Validation from "./Validation";
import { registerUser } from "../config/Userservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();

export default function Register() {
    const navigate = useNavigate();
    const success = (data) =>
        toast.success(data, { position: toast.POSITION.TOP_RIGHT });
    const failure = (data) =>
        toast.error(data, { position: toast.POSITION.TOP_RIGHT });
    const warning = (data) =>
        toast.warn(data, { position: toast.POSITION.TOP_RIGHT });

    const registerUsers = () => {
        registerUser(values).then((res) => {
            if (res.data.flag === 1) {
                success(res.data.message);
                navigate("/");
            } else if (res.data.flag === 0) {
                failure(res.data.message);
            } else {
                warning(res.data.message);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(registerUsers);
    // console.log(values);
    return (
        <div>
            <Container className="text-center mt-4" style={{ width: "50%" }}>
                <FontAwesomeIcon
                    icon={faUserPen}
                    className="login-icon"
                    size="4x"
                />
                <Form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handler}
                        />
                        <Form.Text>
                            {errors.name && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {errors.name}
                                </p>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handler}
                        />
                        <Form.Text>
                            {errors.email && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {errors.email}
                                </p>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            onChange={handler}
                        />
                        <Form.Text>
                            {errors.password && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {errors.password}
                                </p>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            name="cpassword"
                            onChange={handler}
                        />
                        <Form.Text>
                            {errors.cpassword && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {errors.cpassword}
                                </p>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit">
                            Register
                        </Button>
                    </div>

                    <div className="mt-2">
                        <a href="/">
                            <small className="text-dark">
                                Already have an Account? Sign In
                            </small>
                        </a>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
