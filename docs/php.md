# PHP
## variables

```php
//en index.php
<?php $myvariable = 'yaninaaaa'; ?>
<p>hola <?php echo $myvariable; ?></p>

```

## condicional if
```php
//en index.php
<?php

$yanina = 'presente';
if($yanina == 'presente' ){
     echo 'YANINAAAAAA!!!!!!';
}
 elseif($yanina == 'distraida'  ){
     echo 'YANINA YAMILA YESICA GISELLE!!!!!!';
}

else{
     echo 'YANINAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!';
}
?>
```

```php
//en index.php
<?php

$yanina = 'presente';
if($yanina == 'presente' ):
     echo 'YANINAAAAAA!!!!!!';
elseif($yanina == 'distraida'  ):
     echo 'YANINA YAMILA YESICA GISELLE!!!!!!';
else:
     echo 'YANINAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!';
endif;
?>
```
## funciones

```php

<?php
     function myfuncion($pedido){
           echo 'te pido por favor que ' . $pedido;
     }  
?>
<p><?php myfuncion('te calmes');?> </p>
<p><?php myfuncion('te calmes muchisisísimo');?></p>
```
### Asociar acción dentro del ciclo de vida de wordpress

```php
// buscar ciclos de vida de wp.
<?php
     function myfuncion($pedido){
           echo 'te pido por favor que ' . $pedido;
     }  
     add_action('wp_head', 'myfuncion');
?>

```


