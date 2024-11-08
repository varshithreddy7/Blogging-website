import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={ <SignUp /> }/>
          <Route path="/signin" element={ <SignIn /> }/>
          <Route path="/blog/:id" element= { <Blog /> }/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path="publish" element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
