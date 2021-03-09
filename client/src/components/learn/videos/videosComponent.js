import React from "react";
import "./videosComponent.css"
const videos=()=>{
    return (
        <div className="chessBoard">
            <iframe src="https://lichess.org/tv/frame?theme=blue-marble&bg=dark" style={{width: "800px", height: "800px"}} allowtransparency="true" frameborder="0"></iframe>
        </div>
    );
}
export default videos;