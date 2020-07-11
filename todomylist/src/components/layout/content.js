import React from 'react'
import {Sidebar} from './sidebar'
import {Tasks} from '../tasks'
export const Content=()=>(
    <section>
        <Sidebar />
        <Tasks />
    </section>
)