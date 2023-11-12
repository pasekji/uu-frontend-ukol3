import React from 'react';
import './styles/ShoppingListPreview.css';

function ShoppingListPreview({ list, onSelect, onArchiveToggle, onDelete, currentUserId }) {
    return (
        <div className="shopping-list-preview">
            <h2>{list.listName}</h2>
            <p>{list.items.length} items in total</p>
            <p>{list.items.filter(item => item.solved).length} items solved</p>
            <button onClick={() => onSelect(list)}>View detail</button>
            <button onClick={() => onArchiveToggle(list.id)}>
                {list.archived ? 'Unarchive' : 'Archive'}
            </button>
            {list.owner === currentUserId && (
                <button onClick={() => onDelete(list.id)}>Delete</button>
            )}
        </div>
    );
}

export default ShoppingListPreview;
