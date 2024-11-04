<?php include 'config/App.php'; ?>
<?php $ingrediente = $_GET['ingrediente'] ?>

<?php 
if(!empty($ingrediente)) :
$object->queryPG($ingrediente); 
endif;
?>
