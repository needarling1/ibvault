import React from 'react'
import NavBar
 from '../NavBar/NavBar';
const Home = () => {
  return (
    <div className = "flex flex-col w-full h-full">
        <NavBar/>
        <div className = "flex flex-col justify-center items-center h-screen">
            <h1 className = "text-5xl p-4">Ace your next Investment Banking Interview.</h1>
            <span className = "text-xl p-4">BIWS is the best way to study for technical investment banking interviews, equipped with OpenAI's latest model for an interactive learning experience.</span>
        </div>
    </div>
  )
}

export default Home;