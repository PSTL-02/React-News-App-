import { ArticleContext } from "../context/ArticleContext";
import { useContext } from "react";

export const useArticlesContext = () => {
    const context = useContext(ArticleContext) // providing state and dispatch
    
    // Error Preventions
    if (!context){
        throw Error ("useArticlesContext hook must be used inside of ArticleContextProvider")
    }

    return context
}
