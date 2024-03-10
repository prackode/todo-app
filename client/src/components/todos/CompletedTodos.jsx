import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDoneOutline } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { API_URL } from "../config";
import "./style.css";

const CompletedTodos = () => {
    const navigate = useNavigate();
    const [completedTodos, setCompletedTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompletedTodos();
    }, []);

    const fetchCompletedTodos = async () => {
        try {
            const response = await axios.get(`${API_URL}/completed-todo-list`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            setCompletedTodos(response.data.completedTodos);
            setLoading(false);
        } catch (error) {
            if (error.response.data.error) {
                navigate("/login");
            }
            setLoading(false);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            const response = await axios.delete(`${API_URL}/todo/delete`, {
                data: { todoId },
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            fetchCompletedTodos();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const filteredCompletedTodos = completedTodos.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const getTimeAgo = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };

    if (loading) {
        return <div className="loading"><p>Loading completed todos...</p></div>;
    }

    return (
        <div className="routing-content">
            <h1 className="section-heading">Completed Todo(s)</h1>
            {filteredCompletedTodos.length === 0 ? (
                <p>No completed todos found.</p>
            ) : (
                <ul className="todos-container">
                    {filteredCompletedTodos.map((todo) => (
                        <li key={todo._id} className="todo">
                            <div>
                                <span>
                                    <MdDoneOutline className="done" />
                                    {todo.todo}
                                </span>
                                <span className="time-ago">{getTimeAgo(todo.createdAt)}</span>
                                <button onClick={() => handleDeleteTodo(todo._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompletedTodos;