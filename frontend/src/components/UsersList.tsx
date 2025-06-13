import React from "react";
import { ListGroup } from 'react-bootstrap';

interface UsersListProps {
    users: Array<{ id: number; username: string }>;
    onSelect?: (id:number) => void;
    selectedId?: number | null;
}

const UsersList: React.FC<UsersListProps> = ({ users, onSelect, selectedId }) => (
    <ListGroup variant="flush">
        {users.map((user) => (
            <ListGroup.Item 
                key={user.id}
                action={!!onSelect}
                active={user.id === selectedId}
                onClick={() => onSelect && onSelect(user.id)}
                >
                {user.username}
            </ListGroup.Item>
        ))}
    </ListGroup>
);

export default UsersList;