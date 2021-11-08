import React,{useState} from "react";
import NoteContext from "./noteContext";

const Notestate = (props)=>{
    const s1 = {
        "name":"Sumit",
        "class":"12th"
    }
    const [state, setstate] = useState(s1)
    const update= ()=>{
        setTimeout(() => {
            setstate({
                "name":"Arnav",
                "class":"3rd"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default Notestate;