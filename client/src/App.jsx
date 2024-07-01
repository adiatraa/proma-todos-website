import React, { useState } from "react";
import './App.css';
import logo from './assets/todoLogo.png';
import ButtonAdd from './components/ButtonAdd';
import { FunnelIcon, RectangleGroupIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { AdjustmentsVerticalIcon, PlusIcon } from '@heroicons/react/20/solid';
import TodoSection from './components/TodoSection';

const tabs = [
  { name: 'List', href: '#', current: true },
  { name: 'Board', href: '#', current: false },
  { name: 'Gantt', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Overview', href: '#', current: false },
  { name: 'Workflow', href: '#', current: false },
  { name: 'Messages', href: '#', current: false },
  { name: 'File', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function App() {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  return (
    <div>
      <div className="bg-white top-0 gap-8 fixed w-full z-50 flex p-5 items-center">
        <img className="h-10 w-10 ml-4" src={logo} alt="" />
        <p className="text-2xl font-bold">Todo</p>
      </div>
      <div className="mt-20">
        <div className="border-b border-gray-200 w-full">
          <div className="sm:flex sm:items-baseline">
            <div className="mt-4 sm:ml-10 sm:mt-0">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? 'border-[#1977F1] text-[#1977F1]'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-4 px-1 pb-4 text-sm font-semibold',
                    )}
                    aria-current={tab.current ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 border-b border-gray-200">
        <div className="inline-flex gap-4">
          <ButtonAdd onAddTask={handleAddTask} />
          <button
            type="button"
            className="relative inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-transparent hover:bg-gray-50"
          >
            <FunnelIcon className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Filter
          </button>
          <button
            type="button"
            className="relative inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-transparent hover:bg-gray-50"
          >
            <AdjustmentsVerticalIcon className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Sort
          </button>
          <button
            type="button"
            className="relative inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-transparent hover:bg-gray-50"
          >
            <RectangleGroupIcon className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Group By
          </button>
          <button
            type="button"
            className="relative inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-transparent hover:bg-gray-50"
          >
            <EyeSlashIcon className="mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Hide
          </button>
        </div>
      </div>
      <div className="border-b border-gray-200 flex">
        <div className="p-5 ml-4 mr-96">
          <p>Task Name</p>
        </div>
        <div className="p-5 w-60 border-r border-l border-gray-200">
          <p>Assignee</p>
        </div>
        <div className="p-5 w-60 border-r border-gray-200">
          <p>Due Date</p>
        </div>
        <div className="p-5 w-60 border-r border-gray-200">
          <p>Priority</p>
        </div>
        <div className="p-5 w-60 border-r border-gray-200">
          <p>Status</p>
        </div>
        <div className="p-5">
          <PlusIcon className="mr-2 h-5 w-5 text-gray-900" aria-hidden="true" />
        </div>
      </div>
      <div>
        <TodoSection isAddingTask={isAddingTask} setIsAddingTask={setIsAddingTask} />
      </div>
    </div>
  );
}

export default App;
