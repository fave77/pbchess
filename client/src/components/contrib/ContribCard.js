import React, { useState, useEffect } from 'react'
import "./contrib.css"
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';

function ContribCard(props) {

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
        <div onClick={onclickHandler}>
            <span className="boundary">
                <Image src={props.avatar} roundedCircle responsive className="img" />
                {data == [] ? "unknown" : data.name}
                <h3>{props.login}</h3>
            </span>
        </div>
    )
}

export default ContribCard
