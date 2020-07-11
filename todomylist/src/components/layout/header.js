import React from 'react'
import {FaPizzaSlice} from 'react-icons/fa'
import  firebase from '../../firebase'
export const Header=()=>{
    const x=1
   return <header className='header' data-testid='header '>
       <nav>
           <div className='logo'>
               <img src="/images/logo.png" alt="TodoList"/>
           </div>
           <div className='settings'>
               <ul>
                   <li>+</li>
                   <li><FaPizzaSlice/>Pizza sclice!</li>
                    
               </ul>
           </div>
       </nav>
   </header>
}