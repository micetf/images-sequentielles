import React from "react";

const messages = () => (
    <div className="card-footer text-center">
        <div className="row mt-2 bg-dark text-white" id="consigne">
            <h4 className="py-2">
                Remets ces images dans l'ordre chronologique et{" "}
                <button className="btn btn-success ml-2" id="valider">
                    Valide
                </button>
                .
            </h4>
        </div>
        <div className="row mt-2 bg-dark text-white" id="melanger">
            <button className="my-2 btn btn-primary">Mélanger</button>
        </div>
        <div className="mt-2" id="messages">
            <h4 className="bg-success text-white" id="juste">
                Bravo ! Tu as retrouvé l'ordre des images en <span></span>.
            </h4>
            <h4 className="bg-warning text-dark" id="faux">
                Vérifie ! Tu as fait des erreurs.
            </h4>
        </div>
    </div>
);

export default messages;
