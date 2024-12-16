import {createContext, useState} from 'react'

export const Firebasecontex=createContext(null)

export const AuthContext=createContext(null)

export default function Auth({children}) {
    const [User, setUser] = useState()
    return(
        <AuthContext.Provider value={{User,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}