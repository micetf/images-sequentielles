import React from "react";
import Header from "./header";
import Sequence from "./sequence";
import Messages from "./messages";

const tri = () => {
    return (
        <div className="card m-2" id="tri">
            <Header />
            <Sequence />
            <Messages />
        </div>
    );
};

export default tri;
