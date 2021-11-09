import React,{useState} from "react";
import NoteContext from "./noteContext";

const Notestate = (props)=>{
    const notesInitial=[
        {
          "_id": "618a0f44f00882178e5c196b",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSSSS..................",
          "description": "This is description 2..................",
          "tag": "personal",
          "date": "2021-11-09T06:03:48.140Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        },
        {
          "_id": "618a0f4bf00882178e5c196d",
          "user": "618a0f2ff00882178e5c1969",
          "title": "Hellloooo GUYSSSS",
          "description": "This is descriptio",
          "tag": "personal",
          "date": "2021-11-09T06:03:55.798Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default Notestate;