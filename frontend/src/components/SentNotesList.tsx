import React from "react";
import { Col, Row } from 'react-bootstrap';
import { StickyNote } from '../types/stickyNote';
import NoteCard from './NoteCard';

interface SentNotesListProps {
    notes: StickyNote[];
    onRefresh: () => void;
}

const SentNotesList: React.FC<SentNotesListProps> = ({ notes, onRefresh }) => (
    <Row xs={1} className="g-4">
        {notes.map((note) => (
            <Col key={note.id}>
                <NoteCard note={note} onRefresh={onRefresh} hideAction />
            </Col>
        ))}
    </Row>
);

export default SentNotesList;
