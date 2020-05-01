import React from "react";
import jeux from "../../../jeux/jeux.congig";

const albumLink = ({ album }) => (
    <>
        [
        <a href={album} target="_blank" title="Chez Amazon">
            Album
        </a>
        ]
    </>
);
const renderSeries = ({ series, nbreImages }) =>
    series.map((serie) => (
        <li key={serie.id} className="list-group-item">
            <span id={serie.id} data-qte={nbreImages}>
                {serie.name}
            </span>{" "}
            {serie.album && albumLink(serie)}
        </li>
    ));
const renderListe = (jeux) =>
    jeux.map((groupe) => (
        <li key={groupe.nbreImages} className="list-group-item">
            <div className="bg-secondary text-light">
                {groupe.nbreImages} images
            </div>
            <ul className="list-group">{renderSeries(groupe)}</ul>
        </li>
    ));
const galerie = () => (
    <div className="card">
        <div className="card-header bg-info">
            Utilise les images séquentielles de MiCetF :
        </div>
        <div className="card-body">
            <ul className="list-group" id="exemples">
                {renderListe(jeux)}
            </ul>
        </div>
    </div>
);

export default galerie;
