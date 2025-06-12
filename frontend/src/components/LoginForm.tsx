import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
            onSuccess && onSuccess();
        } catch {
            setError('Credenziali non valide');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
            </Form.Group>
            <Form.Group controlId="password" className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    required
                    />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-3'>
                Accedi
            </Button>
            
        </Form>
        );

};

export default LoginForm;