import React from "react";
import { Button, Card } from 'react-bootstrap';
import api from '../api/client';
import { StickyNote } from '../types/stickyNote';


interface NoteCardProps {
    note: StickyNote;
    onRefresh: () => void;
    hideAction?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onRefresh, hideAction }) => {
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

                {/* Action button: 'Letta' if read, 'Segna come letta' if unread */}
                {!hideAction && (
                    <div className="d-flex justify-content-end mb-3">
                        {note.is_read ? (
                            <Button variant="secondary" size = "sm" disabled>
                                Letta
                            </Button>
                        ) : (
                            <Button variant="success" size="sm" onClick={markAsRead}>
                                Segna come letta
                            </Button>
                        )}
                    </div>
                )}
                
                <Card.Footer>
                    <small className='text-muted'>
                        {new Date(note.created_at).toLocaleString()}
                    </small>
                </Card.Footer>
                
            </Card.Body>
        </Card>
    );
};

export default NoteCard;