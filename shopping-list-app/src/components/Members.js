import React from 'react';
import MemberItem from './MemberItem';
import './styles/Members.css';

function Members({ memberList, allUsers, listId, currentUser, onUpdateMembers }) {
    const notMembers = allUsers.filter(user => !memberList.map(m => m.id).includes(user.id));
    
    const handleAddMember = (memberId) => {
        const updatedMembers = [...memberList.map(m => m.id), memberId];
        onUpdateMembers(listId, updatedMembers);
    };
    
    const handleRemoveMember = (memberId) => {
        const updatedMembers = memberList.map(m => m.id).filter(id => id !== memberId);
        onUpdateMembers(listId, updatedMembers);
    };
    
    const handleLeaveList = () => {
        const updatedMembers = memberList.map(m => m.id).filter(id => id !== currentUser.id);
        onUpdateMembers(listId, updatedMembers);
    };

    return (
        <div className="members-container">
            <h3>Members</h3>
            {memberList.map((member, index) => (
                <div key={index}>
                    <MemberItem member={member} />
                    {currentUser.id === listId && <button onClick={() => handleRemoveMember(member.id)}>Remove</button>}
                </div>
            ))}
            {currentUser.id === listId && notMembers.map(user => (
                <button key={user.id} onClick={() => handleAddMember(user.id)}>Add {user.name}</button>
            ))}
            {memberList.map(m => m.id).includes(currentUser.id) && 
                <button onClick={handleLeaveList}>Odejít z nákupního seznamu</button>}
        </div>
    );
}

export default Members;
