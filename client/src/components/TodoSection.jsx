import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, CheckBadgeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import mainApi from '../services/mainApi';

const TodoSection = () => {
    const [sectionOpen, setSectionOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState({ taskName: "", assignee: "", dueDate: "", priority: "", status: "" });
    const [isAddingTask, setIsAddingTask] = useState(false);

    useEffect(() => {
        mainApi
            .get("/todoList")
            .then((res) => {
                console.log(res.data);
                setTodoList(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleAddTask = () => {
        setNewTask({ taskName: "", assignee: "", dueDate: "", priority: "", status: "" });
        setIsAddingTask(true);
    };

    const handleSaveTask = () => {
        mainApi
            .post("/todoList", newTask)
            .then((res) => {
                setTodoList([...todoList, res.data]);
                setIsAddingTask(false);
                setNewTask({ taskName: "", assignee: "", dueDate: "", priority: "", status: "" });
            })
            .catch((err) => console.error(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    return (
        <div>
            <button onClick={() => setSectionOpen(!sectionOpen)} className="p-5 border-b border-gray-200 flex items-center w-full">
                {sectionOpen ? <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" /> : <ChevronRightIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" />}
                <h1 className="ml-4 font-bold text-2xl">To do</h1>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${sectionOpen ? "block" : "hidden"
                }`}>
                {todoList.map((todo) => (
                    <div key={todo.id} className="flex w-full border-b border-gray-200">
                        <div className="ml-4 flex items-center w-[505px] overflow-hidden">
                            <CheckBadgeIcon className="mr-2 h-7 w-7 text-gray-900 ml-4" aria-hidden="true" />
                            <p>{todo.taskName}</p>
                        </div>
                        <div className="p-5 w-60 border-r border-l border-gray-200 overflow-hidden">
                            <p>{todo.assignee}</p>
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <p>{todo.dueDate}</p>
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <p>{todo.priority}</p>
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <p>{todo.status}</p>
                        </div>
                    </div>
                ))}
                {isAddingTask && (
                    <div className="flex w-full border-b border-gray-200">
                        <div className="ml-4 flex items-center w-[505px] overflow-hidden">
                            <CheckBadgeIcon className="mr-2 h-7 w-7 text-gray-900 ml-4" aria-hidden="true" />
                            <input
                                className="w-full p-2"
                                name="taskName"
                                placeholder="Task Name"
                                value={newTask.taskName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-l border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2"
                                name="assignee"
                                placeholder="Assignee"
                                value={newTask.assignee}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2"
                                name="dueDate"
                                placeholder="Due Date"
                                value={newTask.dueDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2"
                                name="priority"
                                placeholder="Priority"
                                value={newTask.priority}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                            <input
                                className="w-full p-2"
                                name="status"
                                placeholder="Status"
                                value={newTask.status}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="p-5">
                            <button className="text-blue-600" onClick={handleSaveTask}>Save</button>
                        </div>
                    </div>
                )}
                <div className="p-5 ml-4 cursor-pointer" onClick={handleAddTask}>
                    <p>Add task...</p>
                </div>
            </div>
        </div>
    );
};

export default TodoSection;
