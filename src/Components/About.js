import React, { useContext,useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
        a.update()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <h3>This is About {a.state.name} and i am in class {a.state.class}</h3>
        </>
    )
}

export default About
