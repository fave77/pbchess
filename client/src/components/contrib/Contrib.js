import React, { useState, useEffect } from 'react'
import ContribCard from './ContribCard.js'
import { useSpring, animated, useTransition } from 'react-spring'

import Footer from "../footer/footer";

function Contrib() {
    const [data, setData] = useState([]);
    const url = "https://api.github.com/repos/fave77/pbchess/contributors"
    const styl = useSpring({ opacity: 1, from: { opacity: 0 } })


    const fetchURL = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData)
    }

    useEffect(() => {
        fetchURL();
    }, [])

    const [show, set] = useState(false)
    const transitions = useTransition(show, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
        <div className="page_container">
            <center><h1>Thanks to all our contributors</h1></center>
            <br />
            <br />

            <animated.div style={styl} className="space">
                {data.map(({ avatar_url, url, login, html_url }) => (
                    <ContribCard avatar={avatar_url} url={url} login={login} html_url={html_url}></ContribCard>
                ))}
            </animated.div>
            <br></br>
        </div>
    )
}

export default Contrib
