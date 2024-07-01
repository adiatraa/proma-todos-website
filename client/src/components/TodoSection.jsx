import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, CheckBadgeIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import mainApi from '../services/mainApi';

const TodoSection = ({ isAddingTask, setIsAddingTask }) => {
    const [sectionOpen, setSectionOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState({ taskName: "", assignee: "", dueDate: "", priority: "", status: "" });

    useEffect(() => {
        mainApi
            .get("/todoList")
            .then((res) => {
                setTodoList(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleSaveTask = () => {
        mainApi
            .post("/todoList", newTask)
            .then((res) => {
                setTodoList([...todoList, res.data]);
                setIsAddingTask(false);
                setNewTask({ taskName: "", assignee: "", dueDate: "", priority: "", status: "" });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Created',
                    text: 'Your task has been created successfully!',
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((err) => console.error(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleEditInputChange = (id, e) => {
        const { name, value } = e.target;
        setTodoList(prevList => prevList.map(task => task.id === id ? { ...task, [name]: value } : task));
    };

    const handleUpdateTask = (id) => {
        const updatedTask = todoList.find(task => task.id === id);
        mainApi
            .put(`/todoList/${id}`, updatedTask)
            .then((res) => {
                setTodoList(prevList => prevList.map(task => task.id === id ? res.data : task));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Updated',
                    text: 'Your task has been updated successfully!',
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteTask = (id) => {
        mainApi
            .delete(`/todoList/${id}`)
            .then(() => {
                setTodoList(prevList => prevList.filter(task => task.id !== id));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task Deleted',
                    text: 'Your task has been deleted successfully!',
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch((err) => console.error(err));
    };

    const handleKeyPress = (id, e) => {
        if (e.key === 'Enter') {
            if (id === null) {
                handleSaveTask();
            } else {
                handleUpdateTask(id);
            }
        }
    };

    return (
        <div>
            <button onClick={() => setSectionOpen(!sectionOpen)} className="p-5 border-b border-gray-200 flex items-center w-full">
                {sectionOpen ? <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" /> : <ChevronRightIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" />}
                <h1 className="ml-4 font-bold text-2xl">To do</h1>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${sectionOpen ? "block" : "hidden"}`}>
                {todoList.map((todo) => (
                    <div key={todo.id} className="flex w-full border-b border-gray-200">
                        <div className="ml-4 flex items-center w-[505px] overflow-hidden">
                            <CheckBadgeIcon className="mr-2 h-7 w-7 text-gray-900 ml-4" aria-hidden="true" />
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="taskName"
                                value={todo.taskName}
                                onChange={(e) => handleEditInputChange(todo.id, e)}
                                onKeyPress={(e) => handleKeyPress(todo.id, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-l border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="assignee"
                                value={todo.assignee}
                                onChange={(e) => handleEditInputChange(todo.id, e)}
                                onKeyPress={(e) => handleKeyPress(todo.id, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="dueDate"
                                value={todo.dueDate}
                                onChange={(e) => handleEditInputChange(todo.id, e)}
                                onKeyPress={(e) => handleKeyPress(todo.id, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="priority"
                                value={todo.priority}
                                onChange={(e) => handleEditInputChange(todo.id, e)}
                                onKeyPress={(e) => handleKeyPress(todo.id, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="status"
                                value={todo.status}
                                onChange={(e) => handleEditInputChange(todo.id, e)}
                                onKeyPress={(e) => handleKeyPress(todo.id, e)}
                            />
                        </div>
                        <div className="p-5">
                            <TrashIcon className="h-7 w-7 text-red-600 cursor-pointer" aria-hidden="true" onClick={() => handleDeleteTask(todo.id)} />
                        </div>
                    </div>
                ))}
                {isAddingTask && (
                    <div className="flex w-full border-b border-gray-200">
                        <div className="ml-4 flex items-center w-[505px] overflow-hidden">
                            <CheckBadgeIcon className="mr-2 h-7 w-7 text-gray-900 ml-4" aria-hidden="true" />
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="taskName"
                                placeholder="Write a task name.."
                                value={newTask.taskName}
                                onChange={handleInputChange}
                                onKeyPress={(e) => handleKeyPress(null, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-l border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="assignee"
                                placeholder="Assign to people"
                                value={newTask.assignee}
                                onChange={handleInputChange}
                                onKeyPress={(e) => handleKeyPress(null, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="dueDate"
                                placeholder="Due Date.."
                                value={newTask.dueDate}
                                onChange={handleInputChange}
                                onKeyPress={(e) => handleKeyPress(null, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="priority"
                                placeholder="Priority.."
                                value={newTask.priority}
                                onChange={handleInputChange}
                                onKeyPress={(e) => handleKeyPress(null, e)}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2 border-transparent focus:outline-none focus:ring-0 focus:border-transparent"
                                name="status"
                                placeholder="Status.."
                                value={newTask.status}
                                onChange={handleInputChange}
                                onKeyPress={(e) => handleKeyPress(null, e)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoSection;
