'use client';

import React, { useState, useEffect } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import { Trash2 } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const TodoList: React.FC<ToolProps> = ({ details, toolId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [loaded, setLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('todo-tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }, [tasks, loaded]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    const newTask: Task = { id: Date.now(), text: input.trim(), completed: false };
    setTasks(prev => [...prev, newTask]);
    setInput('');
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      toast.info('No completed tasks to clear');
      return;
    }
    setTasks(prev => prev.filter(t => !t.completed));
    toast.success(`Cleared ${completedCount} completed task${completedCount === 1 ? '' : 's'}`);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <ToolContainer title="To-Do List" details={details} toolId={toolId}>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <Input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <Button type="submit" className="shrink-0">
            Add
          </Button>
        </form>

        <div
          className="flex justify-center gap-1 mb-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg"
          role="tablist"
          aria-label="Filter tasks"
        >
          {(['all', 'active', 'completed'] as Filter[]).map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`w-1/3 py-1.5 rounded-md text-sm capitalize transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg min-h-[200px]">
          {filteredTasks.length === 0 ? (
            <div className="flex items-center justify-center h-[180px] text-sm text-gray-400 dark:text-gray-500 text-center px-4">
              {tasks.length === 0
                ? 'No tasks yet — add your first one above.'
                : `No ${filter} tasks.`}
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                  className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 mr-3 cursor-pointer"
                />
                <span
                  className={`flex-grow break-words ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete "${task.text}"`}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between mt-3 px-1 text-sm text-gray-500 dark:text-gray-400">
          <span aria-live="polite">
            {activeCount} active · {completedCount} completed
          </span>
          <button
            onClick={clearCompleted}
            disabled={completedCount === 0}
            className="hover:text-red-500 dark:hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1"
          >
            Clear completed
          </button>
        </div>
      </div>
    </ToolContainer>
  );
};

export default TodoList;
