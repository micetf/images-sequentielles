<?php
if (!empty($_POST['images'])) {
    include 'archive.php';
}
?>
<!doctype html>
<html class="no-js" lang="fr">
<head>
  <meta charset="utf-8">
  <title>Générer un dossier d'images séquentielles</title>
  <meta name="description" content="Application web permettant de générer une archive contenant des images séquentielles ordonnées.">
  <meta name="keywords" content="maternelle, école, primaire, images séquentielles">
  <meta name="viewport" content="width=device-width">

  <link rel="stylesheet" href="css/generateur.bundle.css">
  <link rel="canonical" href="http://micetf.fr/images-sequentielles">

  <script src="../library/js/modernizr-2.5.3.min.js"></script>
</head>
<body>

  <header>
    <h1>Générer un dossier d'images séquentielles</h1>
    <p>
    Créé par <a href="http://micetf.fr" title="Des Outils Pour La Classe">MiCetF</a> (2012) -
    <a id="contact" href="mailto:machin@truc.fr">contact</a> -
    <a href="." title="Retour à l'espace de jeu.">Images séquentielles</a>
    </p>
  </header>
  <div role="main">
  <p>
  <label for="images" title="Les images (3 minimum - 8 maximum) seront enregistrées dans le même dossier et elles seront nommées de telle sorte que l'ordre alphabétique corresponde à l'ordre chronologique.">Choisir entre 3 et 12 images à ordonner : </label>
  <input type="button" id="importer" value="Importer les images">
  <input type="file" id="images" name="images" multiple accept="image/jpeg, image/png"/>
  </p>

  <table>
    <tr id="sequence"><td></td></tr>
  </table>


  <form  id="consigne" action="generateur.php" name="archive" method="post">
    <span>Placer ces images dans l'ordre chronologique et </span>
    <input type="submit" id="archive" value="générer l'archive">
    <span >.</span>
    <div id="donnees"></div>
  </form>

  </div>

  <footer>
    <p>Si vous pensez que cet outil le mérite...</p>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="ZXVEXH5392YTY">
<input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !" title="Si vous pensez que cet outil le mérite..." >
<img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
</form>

  </footer>
  <script src="../library/js/jquery.js"></script>
  <script src="../library/js/jquery-ui.js"></script>
  <script src="../library/js/jquery.ui.touch-punch.min.js"></script>
  <script src="../library/js/jquery.contact.js"></script>
  <script src="js/generateur.bundle.js"></script>

</body>
</html>
