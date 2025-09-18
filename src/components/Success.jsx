import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

export default function Success() {
    return (
        <Container className="d-flex min-vh-100 justify-content-center align-items-center">
            <Row>
                <Col>
                    <Card>
                        <CardBody className="text-center">
                            <h1>🎉 Login Başarılı!</h1>
                            <p>Hoşgeldiniz, giriş işleminiz başarıyla tamamlandı.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
