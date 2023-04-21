import { useState } from "react";
import { createContext } from "react";


export const userContext = createContext()

import React from 'react';

function UserContext({children}) {
    const [user,setUser] = useState({
        islogin: false,
        username: 'enjoynepal',
        password: 'Enjoynepal'
    })
    return (
        <userContext.Provider value={{user,setUser}}>
            {children}  
        </userContext.Provider>
    );
}

export default UserContext;