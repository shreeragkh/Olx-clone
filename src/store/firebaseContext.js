import {createContext, useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../api'

export const Firebasecontex=createContext(null)

export const AuthContext=createContext(null)

export default function Auth({children}) {
    const [User, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Auth state has been determined
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return(
        <AuthContext.Provider value={{User,setUser}}>
            {!Loading && children}
        </AuthContext.Provider>
    )
}