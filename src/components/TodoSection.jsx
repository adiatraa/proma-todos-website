import React, { useState } from 'react';
import { ChevronDownIcon, CheckBadgeIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const TodoSection = () => {
    const [sectionOpen, setSectionOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setSectionOpen(!sectionOpen)} className="p-5 border-b border-gray-200 flex items-center w-full">
                {sectionOpen ? <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" /> : <ChevronUpIcon className="mr-2 h-5 w-5 text-gray-900 ml-4" aria-hidden="true" />}
                <h1 className="ml-4 font-bold text-2xl">To do</h1>
            </button>
            <div className={`border-b border-gray-200 flex overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
                sectionOpen ? "flex" : "hidden"
            }`}>
                <div className="ml-4 flex items-center w-[505px] overflow-hidden">
                    <CheckBadgeIcon className="mr-2 h-7 w-7 text-gray-900 ml-4" aria-hidden="true" />
                    <p>Create Home Page</p>
                </div>
                <div className="p-5 w-60 border-r border-l border-gray-200 overflow-hidden">
                    <p>Adiat Rahman</p>
                </div>
                <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                    <p>Jun 30 - Jul 2</p>
                </div>
                <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                    <p>Medium</p>
                </div>
                <div className="p-5 w-60 border-r border-gray-200 overflow-hidden">
                    <p>On track</p>
                </div>
            </div>
            <div>
                <h2>tes</h2>
            </div>
        </div>
    )
}

export default TodoSection;