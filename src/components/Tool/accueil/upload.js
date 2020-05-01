import React, { useRef, useEffect } from "react";

const Header = () => (
    <div className="card-header bg-info">
        Utilise les images préparées par ton enseignant
    </div>
);
const Consignes = () => (
    <div className="container">
        <div className="alert alert-info text-justify">
            <sup>*</sup>Préparer entre 3 et 12 images dans un dossier. Les
            images doivent être nommées de telle sorte que l'ordre alphabétique
            corresponde à l'ordre chronologique attendu. L'application web{" "}
            <a href="generateur.php" target="_blank">
                Générateur
            </a>{" "}
            peut vous aider dans cette tâche.
        </div>
    </div>
);
const upload = () => {
    const inputEl = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        inputEl.current.click();
    };

    return (
        <div className="card">
            <Header />
            <div className="card-body">
                <div className="row text-center">
                    <label className="mx-auto my-2" htmlFor="images">
                        <button
                            className="btn btn-primary ml-2"
                            onClick={handleClick}
                        >
                            Importer les images
                        </button>
                        <input
                            type="file"
                            ref={inputEl}
                            id="images"
                            name="images"
                            multiple
                            accept="image/jpeg, image/png"
                        />
                    </label>
                </div>
            </div>
            <Consignes />
        </div>
    );
};

export default upload;
