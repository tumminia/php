<?php include "config/App.php" ?>
<?php

?>
<!DOCTYPE html>
<html <?php $object->language(); ?>>
<head>
<meta name='csrf-token' content='<?php print($object->tokenCsrf()); ?>' charset='UTF-8'>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Php project">
<link rel="manifest" href="/php/manifest.json" crossorigin="use-credentials" />
<title>CAP di tutte le città Italiane</title>
<link rel="icon" href="/php/css/git.svg" sizes="32x32">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="/php/css/index.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel" src="/php/js/react.js" charset="UTF-8"></script>
</head>
<body>

<div id="cookieContainer"></div>

<header>
<h1 id="welcome">Welcome</h1>

<div id="reset">
<i class="bi bi-sign-dead-end"></i>
</div>
</header>

<?php
$city = "Città";
$button = "Invio";

if(!empty($_COOKIE['lang']) AND $_COOKIE['lang']=="en-EN") :
    $city = "City";
    $button = "Push me";
endif;
?>

<nav>
<div id="cap">
<div class='form-floating mb-3'>
<input type="text" id="comune" name="comune" class='form-control' placeholder="<?php echo $city; ?>" required>
<label for="comune"><?php echo $city; ?></label>
</div>
<button id="button_comune"><?php echo $button; ?></button>
</div>

<table>

<thead id="thead">
</thead>

<tbody id="ajax"></tbody>

</table>

<script type="text/javascript" src="js/index.js" charset="UTF-8"></script>

</nav>

</body>
</html>
