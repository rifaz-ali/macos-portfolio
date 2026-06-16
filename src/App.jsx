import React from 'react'
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable)
import gsap from 'gsap';

import { Navbar, Welcome, Dock, Home, MobileHome } from '#components'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from '#windows';

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <MobileHome />

      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Photos/>
      <Text/>
      <Image/>
      <Contact/>
      <Home/>
    </main>
  )
}

export default App