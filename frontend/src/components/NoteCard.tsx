import React from "react";
import { Button, Card } from 'react-bootstrap';
import api from '../api/client';

interface StickyNote {
    id: number;
    sender: number;
    receiver: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface NoteCardProps {
    note: StickyNote;
    onRefresh: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onRefresh }) => {
    const markAsRead = async () => {
        try {
            await api.patch('/notes/${note.id}/', { is_read: true });
            onRefresh();
        } catch (e) {
            console.error('Errore markAsRead;', e)
        }
    };

    return (
        <Card className={note.is_read ? 'border-secondary' : 'border-primary'}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.message}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <small className='text-muted'>
                        {new Date(note.created_at).toLocaleString()}
                    </small>
                    {!note.is_read && (
                        <Button variant='success' size='sm' onClick={markAsRead}>
                            Segna come letta
                        </Button>
                    )}
                </div> 
            </Card.Body>
        </Card>
    );
};

export default NoteCard;