import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div style={{ border: "1px solid black" }}>
            <Row style={{ width: "100vw" }}>
                <Col md={2}>
                    <Image src="./chatapp.jpg" height="60px" width="100px" />
                </Col>
                <Col
                    md={8}
                    className="mt-2 text-center"
                    style={{ fontSize: "x-large", fontWeight: "bolder" }}
                >
                    Chat Application
                </Col>
                <Col md={2} className="mt-2">
                    <Button className="float-end" onClick={() => logout()}>
                        Logout
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
