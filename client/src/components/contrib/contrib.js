import React, { useState, useEffect } from 'react';
import ContribCard from './contrib-card.js';
import FadeIn from 'react-fade-in';


function Contrib() {
    const [data, setData] = useState([]);
    const url = "https://api.github.com/repos/fave77/pbchess/contributors";

    const fetchURL = async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
    };

    useEffect(() => {
        fetchURL();
    }, []);

    return (
        <div className="page_container">
            <center><h1>Thanks to all our contributors</h1></center>
            <br />
            <br />

            <FadeIn>
                <div className="space">
                    {data.map(({ avatar_url, url, login, html_url }) => (
                        <ContribCard avatar={avatar_url} url={url} login={login} html_url={html_url}></ContribCard>
                    ))}
                </div>
            </FadeIn>
            <br></br>
        </div>
    );
}

export default Contrib;
