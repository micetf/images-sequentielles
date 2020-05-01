import React from "react";

const header = () => (
    <div className="card-header bg-secondary">
        <h5 className="row">
            <div className="col">
                <button className="btn btn-primary" id="retour">
                    Accueil
                </button>
            </div>
            <div
                className="col bg-dark text-light text-center py-2"
                id="exemple"
            ></div>
            <div className="col">
                <span className="badge badge-dark p-2 float-right" id="chrono">
                    0 min 00 s
                </span>
            </div>
        </h5>
    </div>
);

export default header;
