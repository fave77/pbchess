import React, { useState, useEffect } from 'react';
import "./contrib.css";
import Image from 'react-bootstrap/Image';
import ProfileCard from "./profile-card";
import FadeIn from 'react-fade-in';


function ContribCard(props) {

    const [loading, setload] = useState(true);
    const [ccolor, setColor] = useState('#151922');


    const [data, setData] = useState([]);
    const url = props.url;

    const fetchURL = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        setload(false);
    };

    useEffect(() => {
        fetchURL();
    }, []);


    return (
        <React.Fragment>
            {loading ? (
                <ProfileCard className="boundary" />
            ) : (
                <FadeIn>
                    <div>
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

                    </div>
                </FadeIn>
            )
            }


        </React.Fragment >
    )
}

export default ContribCard;
