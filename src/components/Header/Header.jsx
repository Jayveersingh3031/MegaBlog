import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen,SetIsMenuOpen]=useState(false);
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-green-500'>
      <Container>
        <nav className='flex justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
              </Link>
          </div>
          <div>
          <i onClick={()=>SetIsMenuOpen(!isMenuOpen)}
          className="ri-menu-3-fill md:hidden" ></i>
          </div>
          <ul className='md:flex ml-auto hidden'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="hover:bg-blue-100 rounded-full px-6"/>
              </li>
            )}
          </ul>
        </nav>
        {isMenuOpen ? <div><ul className='md:hidden'>
            {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='py-2 duration-200 hover:text-gray-200'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="hover:text-gray-200"/>
              </li>
            )}
          </ul>
          </div>:""}
        </Container>
    </header>
  )
}

export default Header