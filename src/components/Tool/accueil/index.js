import React from "react";

import Upload from "./upload";
import Galerie from "./galerie";

const OU = () => (
    <div className="container text-center">
        <h3>
            <div className="badge badge-warning">OU</div>
        </h3>
    </div>
);

const accueil = () => {
    return (
        <div className="container" id="accueil">
            <Upload />
            <OU />
            <Galerie />
        </div>
    );
};

export default accueil;
