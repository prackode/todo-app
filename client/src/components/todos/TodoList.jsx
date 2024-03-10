import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { API_URL } from "../config";
import "./style.css";

const Todos = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodo, setEditingTodo] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${API_URL}/todo-list`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            setTodos(response.data.todos);
            setLoading(false);
        } catch (error) {
            if (error.response.data.error) {
                navigate("/login");
            }
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/create-todo`,
                { todo: newTodo },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            setNewTodo("");
            fetchTodos();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateTodo = async (todoId, completed) => {
        try {
            const response = await axios.put(
                `${API_URL}/todo/update-status`,
                { todoId, completed },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            setEditingTodoId(null);
            setEditingTodo("");
            fetchTodos();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            const response = await axios.delete(`${API_URL}/todo/delete`, {
                data: { todoId },
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            fetchTodos();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdateTodoText = async (todoId) => {
        try {
            const response = await axios.put(
                `${API_URL}/todo/update`,
                { todoId, todo: editingTodo },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            setEditingTodoId(null);
            setEditingTodo("");
            fetchTodos();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleEditingTodo = (todoId) => {
        const todoToEdit = todos.find((todo) => todo._id === todoId);
        setEditingTodoId(todoId);
        setEditingTodo(todoToEdit.todo);
    };

    const filteredTodos = todos.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const getTimeAgo = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    if (loading) {
        return <div className="loading"><p>todos loading...</p></div>;
    }

    return (
        <div className="routing-content">
            <h1 className="section-heading">Todo List</h1>
            <form onSubmit={addTodo} className="add-todo-form">
                <textarea
                    name="new-todo"
                    id="add-new-todo"
                    cols="30"
                    rows="3"
                    value={newTodo}
                    placeholder="Enter your todo here..."
                    onChange={(e) => {
                        setNewTodo(e.target.value);
                    }}
                ></textarea>
                <button type="submit">Add Todo</button>
            </form>
            {filteredTodos.length === 0 ? (
                <p>No todos found</p>
            ) : (
                <ul className="todos-container">
                    {filteredTodos.map((todo) => (
                        <li key={todo._id} className="todo">
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleUpdateTodo(todo._id, !todo.completed)}
                                    />
                                    {editingTodoId === todo._id ? (
                                        <div>
                                            <textarea
                                                type="text"
                                                rows={3}
                                                cols={35}
                                                value={editingTodo}
                                                onChange={(e) => setEditingTodo(e.target.value)}
                                            />
                                            <button onClick={() => handleUpdateTodoText(todo._id)}>
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span
                                                className={todo.completed ? "completed" : ""}
                                                style={{
                                                    textDecoration: todo.completed ? "line-through" : "",
                                                }}
                                            >
                                                {todo.todo}
                                            </span>
                                            <div className="time-ago">
                                                {getTimeAgo(todo.createdAt)}
                                            </div>
                                            <div className="btn-container">
                                                <button onClick={() => handleEditingTodo(todo._id)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteTodo(todo._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>)
            }
        </div>
    );
};

export default Todos;