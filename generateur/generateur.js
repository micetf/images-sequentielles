/* 
Author: Frédéric Misery 
*/
import "./generateur.css";

$(document).ready(function () {
    $("#importer").click(function () {
        $("#images").click();
    });

    $("#images").change(function () {
        var mesImages = $(this).get(0).files;
        var mesCanvas = new Array();
        var nbreImages = mesImages.length;
        if (nbreImages < 3 || nbreImages > 12) {
            if (nbreImages < 3) alert("Il n'y a pas assez d'images.");
            if (nbreImages > 8) alert("Il y a trop d'images.");
            return false;
        }
        var wImage = Math.round($("#sequence").width() / nbreImages) - 18;
        var hImage = Math.round((wImage * 29.7) / 21);
        $("#sequence").height(hImage + 20);
        var imagesChargees = 0;
        $("#sequence")
            .empty()
            .append(
                '<td class="attendre">Patientez, chargement des images !</td>'
            );

        var afficherImages = function () {
            $("#sequence").empty();
            for (var i = 0; i < nbreImages; i++) {
                $("#sequence").append(document.createElement("td"));
                $("#sequence td:last").append(mesCanvas[i]);
            }
            $("#consigne").show();
            var texte = "";
            $("canvas").each(function () {
                texte += this.alt;
            });
        };

        var chargerImage = function (noImage) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = document.createElement("img");
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = wImage;
                canvas.height = hImage;
                canvas.alt = noImage;
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, wImage, hImage);
                mesCanvas.push(canvas);
                img.src = event.target.result;
                img.onload = function () {
                    var ratio = Math.min(
                        wImage / img.width,
                        hImage / img.height
                    );
                    var wDelta = Math.floor(wImage - this.width * ratio) / 2;
                    var hDelta = Math.floor(hImage - this.height * ratio) / 2;
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
                    imagesChargees++;
                    if (imagesChargees == nbreImages) {
                        afficherImages();
                    }
                };
            };
            reader.readAsDataURL(mesImages[noImage]);
        };

        for (var i = 0; i < nbreImages; i++) {
            if (
                mesImages[i].type.match("image.*") &&
                typeof window.FileReader !== "undefined"
            ) {
                chargerImage(i);
            }
        }

        $("#sequence").sortable("enable");
        $("#valider").show();
        $("#melanger,#messages, #messages > *").hide();
        $("#images").val("");
    });

    $("#sequence").sortable({
        cursor: "move",
        deplacement: 10,
        axis: "x",
        opacity: "0.8",
        tolerance: "pointer",
        placeholder: "placeholder",
        forcePlaceholderSize: true,
        scroll: false,
    });

    $("#archive").click(function () {
        $("#donnees").empty();
        $("canvas").each(function () {
            $("#donnees").append(
                '<input type="text" name="images[]" value="' +
                    this.toDataURL() +
                    '"/>'
            );
        });
        return true;
    });

    $("#images").val("");
    $("#contact").contact();
});
