import React, { useState, useEffect } from 'react';
import type { ToolProps } from '../types';
import ToolContainer from '../components/ToolContainer';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList: React.FC<ToolProps> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem('todo-tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Failed to load tasks from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('todo-tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Failed to save tasks to localStorage", error);
        }
    }, [tasks]);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        const newTask: Task = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setInput('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <ToolContainer title="To-Do List">
            <div className="max-w-lg mx-auto">
                <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Add</button>
                </form>

                <div className="flex justify-center gap-2 mb-4 p-1 bg-gray-900 rounded-lg">
                    <FilterButton label="All" current={filter} set={setFilter} />
                    <FilterButton label="Active" current={filter} set={setFilter} />
                    <FilterButton label="Completed" current={filter} set={setFilter} />
                </div>
                
                <div className="space-y-2 bg-gray-900 p-2 rounded-lg min-h-[200px]">
                    {filteredTasks.map(task => (
                        <div key={task.id} className="flex items-center bg-gray-700 p-3 rounded-md">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="h-5 w-5 rounded border-gray-400 text-blue-500 focus:ring-blue-600 mr-3"
                            />
                            <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</span>
                            <button onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-red-400 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </ToolContainer>
    );
};

const FilterButton: React.FC<{label: string, current: string, set: (f: any) => void}> = ({label, current, set}) => {
    const value = label.toLowerCase();
    return (
        <button onClick={() => set(value)} className={`w-1/3 py-1 rounded-md text-sm ${current === value ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>{label}</button>
    )
}

export default TodoList;
