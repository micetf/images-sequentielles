import React, { useEffect } from "react";
import init from "./script";
import Accueil from "./accueil";
import Jeu from "./jeu";
const Tool = () => {
    useEffect(() => {
        init();
    }, []);
    return (
        <div role="main">
            <Accueil />
            <Jeu />
        </div>
    );
};

export default Tool;
