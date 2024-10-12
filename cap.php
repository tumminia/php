<?php include "config/App.php"; ?>
<?php $comune = $_POST["comune"]; ?>

<?php 
if(!empty($comune)) :
print($object->query($comune));
endif;
?>
