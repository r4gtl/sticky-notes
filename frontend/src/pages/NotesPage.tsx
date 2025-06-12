import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import NewNoteForm from '../components/NewNoteForm';
import NotesList from '../components/NotesList';
import { useAuth } from '../context/AuthContext';

interface StickyNote {
    id: number;
    sender: number;
    receiver: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;

}

const NotesPage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [notes, setNotes] = useState<StickyNote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const resp = await api.get<StickyNote[]>('/notes/', { params: { unread: 'true' } });
            setNotes(resp.data);
        } catch (e) {
            console.error('Errorre caricamento note:', e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <Container className='py-4'>
            <Row className='mb-3'>
                <Col><h2>Sticky Notes</h2></Col>
                <Col className='text-end'>
                <Button variant='secondary' onClick={handleLogout}>
                    Logout
                </Button>
                </Col>
            </Row>

            {/* Form per creare nuove note */}
            <NewNoteForm onCreated={fetchNotes} />

            {loading ? (
                <div className='text-center'>
                    <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <NotesList notes={notes} onRefresh={fetchNotes} />
            )}
        </Container>
    );
};

export default NotesPage;