import React, { useState, useEffect } from 'react';
import ContribCard from './contrib-card.js';
import FadeIn from 'react-fade-in';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
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

    /****scrolltop */
  const [isvisible,setIsVisible] = useState(false);
  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
   if (window.pageYOffset > 20) {
     setIsVisible(true);
   }
   else {
     setIsVisible(false);
   }
 }
 useEffect(() => {
   window.addEventListener("scroll" , toggleVisibility)
 }, []);
// make scrolling smooth
 const scrollToTop = () => window.scrollTo({top:0 , behavior:"smooth"});

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

            {isvisible &&
            <div className="scroll-To-Top cursor-pointer text-center"
            onClick={scrollToTop}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>}
        </div>
    );
}

export default Contrib;
