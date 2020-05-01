<?php 
$chemin = 'tmp/'.md5($_SERVER['REMOTE_ADDR']);
if (!file_exists($chemin)) mkdir($chemin);

$zip = new ZipArchive;
$archive=$chemin.'/images.zip';
if ($zip->open($archive, ZipArchive::CREATE) !== TRUE) {
	die("Impossible de créer l'archive");
}

for ($i=0;$i<min(100,count($_POST['images']));$i++) {
    $vignette=imagecreatetruecolor(150,150);
    $src=false;
    if (preg_match("#data:image/png;#",$_POST['images'][$i])) {
        $src = imagecreatefrompng($_POST['images'][$i]);
    } else if (preg_match("#data:image/jpeg;#",$_POST['images'][$i])) {
        $src = imagecreatefromjpeg($_POST['images'][$i]);
    } else if (preg_match("#data:image/gif;#",$_POST['images'][$i])) {
        $src = imagecreatefromgif($_POST['images'][$i]);
    }
    if ($src!=false) {
        imagepng($src,$chemin.'/image'.$i.'.png');
        $zip->addFile($chemin.'/image'.$i.'.png','sequence/image'.$i.'.png');
        imagedestroy($src);
    }
    imagedestroy($vignette);
}
$zip->close();

header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: private",false);
header("Content-Type: application/zip");
header("Content-Disposition: attachment; filename=\"".basename($archive)."\";" );
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($archive));
ob_clean();
flush();
readfile( $archive );
$dir=dir($chemin);
while ($nom=$dir->read()) {
	if (!in_array($nom,array('.','..'))) {
		unlink($chemin.'/'.$nom);
	}
}
rmdir($chemin);

