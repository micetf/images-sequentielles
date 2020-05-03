import "jquery";
import "jquery-ui";
import "jquery-ui/ui/widgets/sortable";
import "jquery-ui-touch-punch/jquery.ui.touch-punch.min";

import chronometre from "./utils/chronometre";

// const _loadFileServer = async (file) =>
//     new Promise((resolve, reject) => {
//         import(file)
//             .then((res) => resolve(res.default))
//             .catch((error) => reject(error));
//     });

// const _loadFileClient = async (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => resolve(event.target.result);
//         reader.onerror = (event) => reject(event);
//         reader.readAsDataURL(file);
//     });
// const _loadImage = async (src) =>
//     new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = src;
//         img.onload = () => resolve(img);
//     });
export default () => {
    let serie;

    const chrono = chronometre("#chrono");
    var getOrdre = function (nbreImages) {
        var ordre = [],
            ordreImages = function () {
                var coincide = 0,
                    i;
                for (i = 0; i < ordre.length; i += 1) {
                    if (ordre[i] === i + 1) {
                        coincide += 1;
                    }
                }
                return coincide > Math.round(ordre.length / 2);
            };

        (function () {
            var i, j, r, ok;
            while (ordre.length === 0 || ordreImages() === true) {
                ordre = [];
                for (i = 0; i < nbreImages; i += 1) {
                    ok = false;
                    r = 0;
                    while (r === 0 || !ok) {
                        r = 1 + Math.round(Math.random() * (nbreImages - 1));
                        ok = true;
                        for (j = 0; j < ordre.length; j += 1) {
                            if (ordre[j] === r) {
                                ok = false;
                            }
                        }
                    }
                    ordre.push(r);
                }
            }
        })();

        return ordre;
    };

    (function () {
        var ordre = [],
            mesCanvas = [],
            imagesChargees = 0,
            nbreImages = 0,
            wImage,
            hImage,
            afficherImages = function () {
                $("#sequence").empty();
                mesCanvas.forEach(function (canvas, i) {
                    var td = document.createElement("td");
                    $(td).append(mesCanvas[ordre[i] - 1]);
                    $("#sequence").append(td);
                });
                $("#tri").show();
                $("#consigne").show();
            },
            chargement = function (loader) {
                mesCanvas = [];
                $("#accueil").hide();
                $("#tri").show();
                ordre = getOrdre(nbreImages);
                wImage = Math.round($("#sequence").width() / nbreImages) - 20;
                hImage = (wImage * 4) / 3;
                $("#sequence").height(hImage + 20);
                imagesChargees = 0;
                $("#sequence")
                    .empty()
                    .append(
                        '<td class="text-light text-center w-100"><h5 class="m-auto">Patientez, chargement des images !</h5></td>'
                    );
                (function () {
                    var i;
                    for (i = 0; i < nbreImages; i += 1) {
                        loader(i);
                    }
                })();
                $("#sequence").sortable("enable");
                $("#valider").show();
                $("#melanger,#messages, #messages > *").hide();
            };

        $("#images").change(function () {
            var mesImages = [],
                readImages = function (files) {
                    var self = {
                        ok: false,
                        nbreImages: 0,
                        images: [],
                        erreur:
                            "Votre navigateur ne supporte pas le téléchargement des images",
                    };
                    if (window.FileReader === undefined) {
                        return self;
                    }
                    self.erreur = "Il n'y a pas assez d'images !";
                    $.grep(files, function (file) {
                        if (file.type.match("image.*")) {
                            self.nbreImages += 1;
                            self.images.push(file);
                        }
                        if (self.nbreImages > 3) {
                            self.ok = true;
                            self.erreur = undefined;
                        }
                        if (self.nbreImages > 12) {
                            self.ok = false;
                            self.erreur = "Il y a trop d'images !";
                        }
                    });
                    return self;
                },
                imagesFromClient = function (index) {
                    var reader = new window.FileReader();
                    reader.onload = function (event) {
                        var img = document.createElement("img"),
                            canvas = document.createElement("canvas"),
                            ctx = canvas.getContext("2d");

                        img.src = event.target.result;
                        mesCanvas.push(canvas);

                        canvas.width = wImage;
                        canvas.height = hImage;
                        canvas.alt = index;
                        ctx.fillStyle = "white";
                        ctx.fillRect(0, 0, wImage, hImage);

                        img.onload = function () {
                            var ratio = Math.min(
                                    wImage / img.width,
                                    hImage / img.height
                                ),
                                wDelta =
                                    Math.floor(wImage - this.width * ratio) / 2,
                                hDelta =
                                    Math.floor(hImage - this.height * ratio) /
                                    2;

                            ctx.drawImage(
                                this,
                                0,
                                0,
                                this.width,
                                this.height,
                                wDelta,
                                hDelta,
                                this.width * ratio,
                                this.height * ratio
                            );
                            imagesChargees += 1;
                            if (imagesChargees === nbreImages) {
                                afficherImages(mesCanvas, ordre);
                            }
                        };
                    };
                    reader.readAsDataURL(mesImages[index]);
                },
                lecture = readImages($(this).get(0).files);

            if (!lecture.ok) {
                window.alert(lecture.erreur);
                return false;
            }
            serie = undefined;
            mesImages = lecture.images;
            nbreImages = lecture.nbreImages;

            $("#exemple").text("Mes images");
            chargement(imagesFromClient);
        });

        $("#exemples span").click(function () {
            var $this = $(this),
                imagesFromServer = function (index) {
                    var img = document.createElement("img"),
                        canvas = document.createElement("canvas"),
                        ctx = canvas.getContext("2d");

                    mesCanvas.push(canvas);

                    canvas.width = wImage;
                    canvas.height = hImage;
                    canvas.alt = index;
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, wImage, hImage);
                    import(
                        "../../jeux/" + serie + "/image" + index + ".png"
                    ).then((src) => {
                        img.src = src.default;
                        img.onload = function () {
                            ctx.drawImage(this, 0, 0, wImage, hImage);
                            imagesChargees += 1;
                            if (imagesChargees === nbreImages) {
                                afficherImages(mesCanvas, ordre);
                            }
                        };
                    });
                };

            serie = this.id;
            $("#exemple").html($this.text());
            nbreImages = $this.data("qte");

            chargement(imagesFromServer);
        });
    })();

    $("#sequence").sortable({
        cursor: "move",
        start: function () {
            chrono.start();
        },
        deplacement: 10,
        axis: "x",
        opacity: "0.8",
        tolerance: "pointer",
        placeholder: "placeholder",
        forcePlaceholderSize: true,
        scroll: false,
    });

    $("#valider").click(function () {
        var OK = (function () {
                var paire = true;
                $("#sequence canvas").each(function (i) {
                    if (i !== this.alt) {
                        paire = false;
                    }
                });
                return paire;
            })(),
            triOK = function () {
                var txt = chrono.text();

                chrono.stop();

                $("#juste span").text(txt);
                $("#messages, #juste, #melanger").show();
                $("#faux, #consigne").hide();
                $("#sequence").sortable("disable");
                return true;
            },
            triKO = function () {
                $("#messages, #faux").show();
                return false;
            };

        if (OK) {
            return triOK();
        }
        return triKO();
    });

    $("#melanger > button").click(function () {
        chrono.raz();

        if (serie) {
            $("#" + serie).click();
        } else {
            $("#images").change();
        }

        $("#sequence").sortable("enable");
    });

    $("#retour").click(function () {
        chrono.raz();

        serie = undefined;
        $("#images").val("");
        $("#tri").hide();
        $("#accueil").show();
    });

    (function () {
        var hash = document.location.hash;
        if (
            hash &&
            hash.match(/#[a-z]*/) !== null &&
            $("#exemples span" + hash).length === 1
        ) {
            $("#exemples span" + hash).click();
        }
        $("#images").val("");
    })();
};
