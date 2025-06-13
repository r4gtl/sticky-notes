import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import NewNoteForm from '../components/NewNoteForm';
import NotesList from '../components/NotesList';
import SentNotesList from '../components/SentNotesList';
import UsersList from '../components/UsersList';
import { useAuth } from '../context/AuthContext';
import { StickyNote } from '../types/stickyNote';


const NotesPage: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const [users, setUsers] = useState<Array<{ id: number; username: string }>>([]);
    const [receivedNotes, setReceivedNotes] = useState<StickyNote[]>([]);
    const [sentNotes, setSentNotes] = useState<StickyNote[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchData = async () => {
        setLoading(true);
        try{
            const [usersRes, recRes, sentRes] = await Promise.all([
                api.get('/auth/users/'),
                api.get('/notes/', { params: { unread: 'true' } }),
                api.get('/notes/', { params: { sent: 'true' } }),
            ]);
            setUsers(usersRes.data);
            setReceivedNotes(recRes.data);
            setSentNotes(sentRes.data);
        } catch (e) {
            console.error('Errore di caricamento dati:' , e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUserSelect = (id: number) => {
        setSelectedUser(id);
    };

    const handleNoteCreated = () => {
        setSelectedUser(null);
        fetchData();
    }
    
    return (
        <Container fluid className='py-4'>
            <Row className='mb-3 align-items-center'>
                <Col>
                    <h2>Sticky Notes App</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <div className='textCenter'>
                    <Spinner animation='border'/>

                </div>
            ) : (
                <Row>
                    {/* Colonna Utenti */}
                    <Col md={3} className='border-end' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <UsersList users={users} onSelect={handleUserSelect} selectedId={selectedUser}/>
                        {selectedUser && (
                            <NewNoteForm receiverId={selectedUser} onCreated={handleNoteCreated} />
                        )}
                    </Col>

                    {/* Colonna note ricevute */}
                    <Col md={6} className='border-end'>
                        <h5>Note Ricevute</h5>
                        <NotesList notes={receivedNotes} onRefresh={fetchData} />
                    </Col>

                    {/* Colonna Note inviate */}
                    <Col md={3} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <h5>Note Inviate</h5>
                        <SentNotesList notes={sentNotes} onRefresh={fetchData} />
                    </Col>
                </Row>
            )}

        </Container>
    );
};

export default NotesPage;