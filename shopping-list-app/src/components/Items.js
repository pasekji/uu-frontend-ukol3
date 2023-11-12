import React, { useState } from 'react';
import ShoppingItem from './ShoppingItem';
import './styles/Items.css';

function Items({ itemList, currentUser, listOwner, listMembers, onUpdateItems }) {
    const [items, setItems] = useState(itemList);
    const [newItem, setNewItem] = useState({ name: '', amount: '', unit: '', solved: false });
    const [showUnresolved, setShowUnresolved] = useState(true);
    const displayedItems = showUnresolved ? items : items.filter(item => !item.solved);

    const handleSolvedChange = (changedItem) => {
        if (currentUser.id === listOwner || listMembers.includes(currentUser.id)) {
            const updatedItems = items.map(item => {
                if (item === changedItem) {
                    return { ...item, solved: !item.solved };
                }
                return item;
            });
            setItems(updatedItems);
            onUpdateItems(updatedItems);
        }
    }

    const handleAddItem = () => {
        if (newItem.name) {
            const updatedItems = [...items, newItem];
            setItems(updatedItems);
            onUpdateItems(updatedItems);
            setNewItem({ name: '', amount: '', unit: '', solved: false });
        }
    };

    const handleRemoveItem = (itemToRemove) => {
        const updatedItems = items.filter(item => item !== itemToRemove);
        setItems(updatedItems);
        onUpdateItems(updatedItems);
    };    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="items-container">
            <div>
                <h3>Items</h3>
                <div>
                    <button onClick={() => setShowUnresolved(true)}>Show all</button>
                    <button onClick={() => setShowUnresolved(false)}>Show unresolved</button>
                </div>
            </div>
            {displayedItems.map((item, index) => (
                <ShoppingItem key={index} item={item} onSolvedChange={handleSolvedChange} onRemove={handleRemoveItem} />
            ))}
            <div className="add-item-form">
                <input 
                    type="text" 
                    name="name"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="amount"
                    placeholder="Amount"
                    value={newItem.amount}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    name="unit"
                    placeholder="Unit"
                    value={newItem.unit}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>
        </div>
    );
}

export default Items;
