import React, { useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import api from '../api/client';

interface NewNoteFormProps {
    onCreated?: () => void;
}

const NewNoteForm: React.FC<NewNoteFormProps> = ({ onCreated }) => {
    const [receiver, setReceiver] = useState<number | ''>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await api.post('/notes/', {
                receiver,
                title,
                message,
            });
            setReceiver('');
            setTitle('');
            setMessage('');
            onCreated && onCreated();


            
        } catch (err: any){
            setError(err.response?.dat?.detail || 'Errore creazione nota');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className='mb-4'>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group controlId='receiver'>
                        <Form.Label>ID Destinatario</Form.Label>
                        <Form.Control
                            type="number"
                            value={receiver}
                            onChange={(e) => setReceiver(Number(e.target.value))}
                            required
                            placeholder='Inserisci ID destinatario'
                        />
                    </Form.Group>
                    <Form.Group controlId="title" className="mt-3">
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group controlId="message" className="mt-3">
                        <Form.Label>Messaggio</Form.Label>
                        <Form.Control
                        as="textarea"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                        {loading ? 'Invio...' : 'Invia Nota'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default NewNoteForm;