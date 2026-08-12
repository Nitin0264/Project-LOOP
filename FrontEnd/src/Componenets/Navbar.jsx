import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='w-full px-8 py-4'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* logo */}
        <div>
          <Link to="/">Project Loop</Link>
        </div>

        <div className='flex gap-5 p-3'>
          <Link to = '/'>Home</Link>
          <Link>Features</Link>
          <Link>About</Link>
          <Link>Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar