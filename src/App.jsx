import React from 'react'
import './App.css'
import logo from '../src/assets/todoLogo.png';

const tabs = [
  { name: 'List', href: '#', current: true },
  { name: 'Board', href: '#', current: false },
  { name: 'Gantt', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Overview', href: '#', current: false },
  { name: 'Workflow', href: '#', current: false },
  { name: 'Messages', href: '#', current: false },
  { name: 'File', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function App() {
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
    </div>
  )
}

export default App
