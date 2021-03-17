import React, { useState, useEffect } from 'react'
import "./contrib.css"
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import { useSpring, animated, useTransition } from 'react-spring'
import { CSSTransition } from 'react-transition-group';
import ProfileCard from "./ProfileCard"
import FadeIn from 'react-fade-in';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 30, (x - window.innerWidth / 2) / 30, 1.03]
const trans = (x, y, s) => `scale(${s})`

function ContribCard(props) {

    const [p, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 200, friction: 30 } }))
    const [loading, setload] = useState(true)
    const [ccolor, setColor] = useState('#151922');


    const [data, setData] = useState([]);
    const url = props.url

    const fetchURL = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData)
        setload(false)
    }

    useEffect(() => {
        fetchURL();
    }, [])

    const mouseDownHandler = (e) => {
        e.style = { color: 'black' }
    }


    return (
        <React.Fragment>
            {loading ? (
                <ProfileCard className="boundary" />
            ) : (
                <FadeIn>
                    <animated.div
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        style={{ transform: p.xys.interpolate(trans) }}
                    >


                        <a href={props.html_url} target="_blank">
                            <span style={{ backgroundColor: ccolor }}
                                className="boundary" onMouseDown={() => { setColor('#1a202b') }}
                                onMouseUp={() => { setColor('#151922') }}
                                onMouseLeave={() => { setColor('#151922') }}>

                                <Image src={props.avatar} roundedCircle responsive className="img" />
                                {data.name == null ? <br /> : data.name}
                                <h3>{props.login}</h3>
                            </span>
                        </a>

                    </animated.div>
                </FadeIn>
            )
            }


        </React.Fragment >
    )
}

export default ContribCard
