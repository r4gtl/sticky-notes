import React from "react";
import { Col, Row } from 'react-bootstrap';
import NoteCard from './NoteCard';


interface StickyNote {
    id: number;
    sender: number;
    receiver: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface NotesListProps {
    notes: StickyNote[];
    onRefresh: () => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onRefresh }) => (
    <Row xs={1} md={2} lg={3} className="g-4">
        {notes.map((note) => (
            <Col key={note.id}>
                <NoteCard note={note} onRefresh={onRefresh} />

            </Col>
        ))}
    </Row>
);


export default NotesList;