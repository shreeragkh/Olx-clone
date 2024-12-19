import {  createContext, useState } from "react";

export const PostDetailsContext=createContext()

function Post_function({children}) {
    const [postDetails, setPostDetails] = useState({})
    



    return(
        <PostDetailsContext.Provider value={{postDetails, setPostDetails}}>
            {children}
        </PostDetailsContext.Provider>
    )
}
export default Post_function