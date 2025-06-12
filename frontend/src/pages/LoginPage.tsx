import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return(
        <Container className='d-flex align-items-center justify-content-center vh-100'>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <LoginForm onSuccess={() => navigate('/notes')} />

                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    );
};

export default LoginPage;