import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout' // Optional: install lucide-react for icons
import { BiMenu, BiX } from 'react-icons/bi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black text-white font-medium p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/home" className="text-lg font-semibold">
            EMPLOYEE M_SYST
            <span className="bg-white rounded text-black text-sm px-2 py-1 ml-1">EM</span>
          </Link>
        </div>

        {/* Hamburger menu button (visible on small screens) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>

        {/* Menu links - hidden on small, visible on md+ */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/department">Department</Link>
          <Link to="/post">Post</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/rec">Recruit</Link>
          <Link to="/rep">Report</Link>
          <Logout />
        </div>
      </div>

      {/* Mobile menu dropdown (visible only when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 flex flex-col">
          <Link to="/department" onClick={() => setIsOpen(false)}>Department</Link>
          <Link to="/post" onClick={() => setIsOpen(false)}>Post</Link>
          <Link to="/add" onClick={() => setIsOpen(false)}>Add Employee</Link>
          <Link to="/rec" onClick={() => setIsOpen(false)}>Recruit</Link>
          <Link to="/rep" onClick={() => setIsOpen(false)}>Report</Link>
          <Logout />
        </div>
      )}
    </nav>
  )
}

export default Navbar
