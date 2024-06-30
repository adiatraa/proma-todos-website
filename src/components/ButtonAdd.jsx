import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PlusIcon } from '@heroicons/react/20/solid'

const items = [
    { name: 'Add Section', href: '#' },
    { name: 'Add Milestone', href: '#' },
    { name: 'Add Approval', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ButtonAdd() {
    return (
        <div className="inline-flex rounded-md shadow-sm ml-4">
            <button
                type="button"
                className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
                <PlusIcon className="mr-2 h-5 w-5 text-gray-900" aria-hidden="true" />
                Add Task
            </button>
            <Menu as="div" className="relative -ml-px block">
                <MenuButton className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                    <span className="sr-only">Open options</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute left-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        {items.map((item) => (
                            <MenuItem key={item.name}>
                                {({ focus }) => (
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
        </div>
    )
}