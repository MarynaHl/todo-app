import React, { useState, useEffect } from 'react'; // Імпортуємо React та хук useState і useEffect
import axios from 'axios'; // Імпортуємо бібліотеку axios для HTTP запитів
import './App.css'; // Імпортуємо стилі

function App() {
    // Створюємо стан для зберігання завдань (todos) та нового завдання (newTodo)
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Використовуємо useEffect для завантаження завдань з сервера при першому рендерингу компонента
    useEffect(() => {
        axios.get('http://localhost:5000/todos') // Відправляємо GET запит до сервера
            .then(response => setTodos(response.data)) // Оновлюємо стан завдань отриманими даними
            .catch(error => console.error(error)); // Логування помилки в разі невдачі запиту
    }, []); // Порожній масив залежностей означає, що цей useEffect виконається лише один раз

    // Функція для додавання нового завдання
    const addTodo = () => {
        if (newTodo.trim() === '') return; // Перевіряємо, чи введений текст не пустий

        const todo = { id: Date.now().toString(), text: newTodo }; // Створюємо нове завдання з унікальним id
        axios.post('http://localhost:5000/todos', todo) // Відправляємо POST запит до сервера з новим завданням
            .then(response => setTodos([...todos, response.data])) // Додаємо нове завдання до стану завдань
            .catch(error => console.error(error)); // Логування помилки в разі невдачі запиту
        setNewTodo(''); // Очищуємо поле введення
    };

    // Функція для видалення завдання
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`) // Відправляємо DELETE запит до сервера з id завдання
            .then(() => setTodos(todos.filter(todo => todo.id !== id))) // Видаляємо завдання зі стану завдань
            .catch(error => console.error(error)); // Логування помилки в разі невдачі запиту
    };

    return (
        <div className="App">
            <h1>Todo List</h1> {/* Заголовок додатку */}
            <input
                type="text"
                value={newTodo} // Значення поля введення прив'язане до стану newTodo
                onChange={(e) => setNewTodo(e.target.value)} // Оновлюємо стан newTodo при зміні введеного тексту
                placeholder="Enter new todo" // Підказка в полі введення
            />
            <button onClick={addTodo}>Add Todo</button> {/* Кнопка для додавання нового завдання */}
            <ul>
                {todos.map(todo => ( // Перебираємо всі завдання та відображаємо їх у списку
                    <li key={todo.id}>
                        {todo.text} {/* Текст завдання */}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button> {/* Кнопка для видалення завдання */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
