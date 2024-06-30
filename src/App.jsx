import React from 'react'
import './App.css'
import logo from '../src/assets/todoLogo.png';

function App() {
  return (
    <div>
      <div className="bg-white top-0 gap-8 fixed w-full z-50 flex p-5 items-center">
        <img className="h-10 w-10 ml-4" src={logo} alt="" />
        <p className="text-2xl font-bold">Todo</p>
      </div>
      <div className="mt-20">
        <h2>tes</h2>
      </div>
    </div>
  )
}

export default App
