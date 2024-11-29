import React, { useState } from "react";
import ReactDOM from "react-dom";
 
// Initial packing items
// const initialItems = [
//   { id: 1, description: "Shirt", quantity: 5, packed: false },
//   { id: 2, description: "Pants", quantity: 2, packed: false },
// ];
 
function Logo() {
  return <h1>My Travel List</h1>;
}
 
function Form( {onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
 
  function handleChange(e) {
    setDescription(e.target.value);
  }
  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault(); // Prevents the default behaviour of the form - Prevents browser from reloading
 
  // If the descripiton is empty, don't need to create a new item
  // When the description is empthy, you don't want empty description objects to be made and populated in the list
  if (!description) return;
 
  // Creates a new JavaScript object
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    }
 
  onAddItems(newItem); // Call the function that was passed in as a prop
 
  // Reset the form
  // Clear the input field after the item has been added to the list
  setDescription("");
  setQuantity(1);
  }
 
  // setItems is the state setter function and it takes prevItems as an argument
  // prevItems is also an empty array - creating a brand new array prevItems
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
    <select
      value={quantity}
      onChange={handleQuantityChange}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
    </select>
    <input
    type="text"
    placeholder="Enter Item here..."
    value={description}
    onChange={handleChange}
    />
    <button type="submit">Add</button>
    </form>
  );
}
 
// Child Component
function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input
      type="checkbox"
      value={item.packed}
      onChange={() => onUpdateItem(item.id)}
      />
      <span
      // style={{ textDecoration: item.packed ? "line-through" : "none"}}
      style={item.packed ? { textDecoration: "line-through "} : {}}>
        {item.quantity} ({item.description})
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
 
// Parent Component
function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
          item={item}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
          key={item.id} />
        ))}
      </ul>
    </div>
  );
}
 
 
 
 
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}
 
function App() {
  const [items, setItems] = useState([]); // Initialise with empty array
 
  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]); // Callback function - latest state variable updated
  }
 
  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Filter out the item with the id that we want to delete
  }
 
  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
 
function Stats({items}) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round ((numPacked / numItems) * 100)
  return (
    <footer className="stats"> 
    <em> 
      {percentage === 100
      ? "You got everything!"
      :`You have ${numItems} items in the list. You already packed ${numPacked} (${percentage}%)`
      }
    </em>
    </footer>
  );
}
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem}/>
      <PackingList
      items={items}
      onDeleteItem={handleDeleteItem}
      onUpdateItem={handleUpdateItem}
     
      />
      <Stats items={items}/>
    </div>
  );
}
 
export default App;