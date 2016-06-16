<?php
header('Access-Control-Allow-Origin: *');
$id = isset($_GET["id"]) ? $_GET['id'] : NULL;

$name = "Vitrail";
$thumb = "http://steatite.hypertopic.org/thumbnail/" . $id;
$image = "http://steatite.hypertopic.org/picture/" . $id;
$description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

$description = ( strlen($description) > 150 ) ? substr($description, 0, 150) . " ..." : $description;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Ratchet template page</title>

        <!-- Sets initial viewport load and disables zooming  -->
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">

        <!-- Makes your prototype chrome-less once bookmarked to your phone's home screen -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <!-- Include the compiled Ratchet CSS -->
        <link href="dist/css/ratchet.min.css" rel="stylesheet">
        <link href="assets/css/font-awesome.min.css" rel="stylesheet">
        <link href="assets/css/style.css" rel="stylesheet">

        <!-- Include the compiled Ratchet JS -->
        <script src="dist/js/ratchet.min.js"></script> 
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    </head>
    <body>

        <!-- Make sure all your bars are the first things in your <body> -->
        <header class="bar bar-nav">
            <div class="header">
                <i class="fa fa-chevron-left"></i><span id="nom_vitrail"><?php echo $name; ?></span>
            </div>
        </header>

        <!-- Wrap all non-bar HTML in the .content div (this is actually what scrolls) -->
        <div class="content">
            <section class="first">
                <div class="thumbnail-container">
                    <img class="zoomable thumbnail" src="<?php echo $thumb; ?>"  />
                </div>
                <div class="social">
                    <i class="fa fa-facebook-square fa-2x"></i>
                    <i class="fa fa-google-plus-square fa-2x"></i>
                    <i class="fa fa-twitter-square fa-2x"></i>
                </div>
            </section>
            <section class="description">
                <?php echo $description; ?>
            </section>
        </div>

    </body>
    <script>
 /*       var xdr = new XMLHttpRequest();
        xdr.onload = function () {
            console.log(xdr.responseText);
        };
        xdr.open("GET", "http://steatite.hypertopic.org/item/Vitraux - Bénel/<?php //echo $id; ?>");
        xdr.setRequestHeader("Content-Type", "application/jsonp");
        xdr.send();*/
        
        $.ajax({
            url : "http://steatite.hypertopic.org/item/Vitraux - Bénel/<?php echo $id; ?>",  
            type : "GET",
            dataType: 'json',
            success: function(data){
                alert();
            }
        });
    </script>
</html>
