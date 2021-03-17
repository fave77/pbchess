import React, { useState, useEffect } from 'react'
import "./contrib.css"
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import { useSpring, animated, useTransition } from 'react-spring'
import { CSSTransition } from 'react-transition-group';


const calc = (x, y) => [-(y - window.innerHeight / 2) / 30, (x - window.innerWidth / 2) / 30, 1.03]
const trans = (x, y, s) => `scale(${s})`

function ContribCard(props) {

    const [p, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    const onclickHandler = (e) => {
        window.location = props.html_url
    }

    const [data, setData] = useState([]);
    const url = props.url

    const fetchURL = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData)
    }

    useEffect(() => {
        fetchURL();
    }, [])


    return (
        <animated.div onClick={onclickHandler}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: p.xys.interpolate(trans) }}
        >



            <span className="boundary">
                <Image src={props.avatar} roundedCircle responsive className="img" />
                {data == [] ? "unknown" : data.name}
                <h3>{props.login}</h3>
            </span>


        </animated.div>
    )
}

export default ContribCard
