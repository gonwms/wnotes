# Wordpress

## Migrar sitio

1. Backup de todos los archivos en cpanel
2. Backup database con phpmyadmin > export
3. Crear nueva nueva DB y usuario
4. Subir database con phpmyadmin > importart
5. En phpmyadmin cambiar el wp-options la URL del sitio.
6. Ftp wp-config poner nuevos datos de user y db
7. Entrar con /wp-admin
8. Pasar better Search & Replace

## plugins

1. Elementor
1. Better Search Replace
1. Smush - compresor imágenes / lazzyload
1. Woocommerce
1. Yoast SEO
1. Prevent Browser caching ??
1. Really Simple SSL
1. WPML - traductor

## Comercio Avanzado

Agregar info de productos en Thankyou Page.
Pasos: wp/wp-content/plugins/woocommerce/templates/order/order-details.php

```php

<table class=”order_details”>
 <tbody>

// Agragar este código para levantar datos de orden

            // ::::::: Order Analytics ::::::::://
            echo '<span class="order_analytics" style="display:none">',  $order,'</span>';
            //::::::::::::::::::::::::::://

// Agregar este código adentro del forEach para levantar datos de cada producto.

             //::::::::::::: Items Analytics :::::::::::::://
                echo'<span class="item_analytics" style="display:none">',  $item,'</span>
                <span class="itemCat_analytics" style="display:none">', $product->get_categories(),'</span>';
             //::::::::::::::::::::::::::://


// Queda así:

               <tbody>
            <?php
            do_action( 'woocommerce_order_details_before_order_table_items', $order );

            // // ::::::: Order Analytics ::::::::://
                echo '<span class="order_analytics" style="display:none">',  $order,'</span>';
               ////::::::::::::::::::::::::::://

            foreach ( $order_items as $item_id => $item ) {
                $product = $item->get_product();

                //::::::::::::: Items Analytics :::::::::::::://
                echo'<span class="item_analytics" style="display:none">',  $item,'</span>
                <span class="itemCategoria_analytics" style="display:none">', $product->get_categories(), '</span>
                <span class="itemMarca_analytics" style="display:none">', $product->get_attribute(' marca '), '</span>
                <span class="itemDieta_analytics" style="display:none">', $product->get_attribute(' dieta '), '</span>
                ';
                //::::::::::::::::::::::::::://

                wc_get_template(
                    'order/order-details-item.php',
                    array(
                        'order'              => $order,
                        'item_id'            => $item_id,
                        'item'               => $item,
                        'show_purchase_note' => $show_purchase_note,
                        'purchase_note'      => $product ? $product->get_purchase_note() : '',
                        'product'            => $product,
                    )
                );
            }

            do_action( 'woocommerce_order_details_after_order_table_items', $order );
            ?>

        </tbody>
```

### Agregar script en Thankyou Page.

Ruta
/wp-content/plugins/woocommerce/templates/checkout/thankyou.php
Antes de que empiece el primer DIV

#### ANALYTICS METHOD

```javascript
<script>
        document.addEventListener('DOMContentLoaded', function(){

                   console.log(":::::::::::::::::::::::::::::::::::::| VIVA PERÓN |::::::::::::::::::::::::::::::::::::::::")


                   var order = document.querySelector('.order_analytics').innerText;
                   var orderObj = JSON.parse(order)
                   var myAnalyticsData = Array.from(document.querySelectorAll('.item_analytics'));
                   var itemMeta = Array.from(document.querySelectorAll('.itemMeta_analytics'));


                   myAnalyticsData.forEach(function(el,i){
                      var item = JSON.parse(el.innerHTML)
                      var meta = JSON.parse(itemMeta[i].innerText)
                      ga('require', 'ec');
                      ga('ec:addProduct', {
                      'id': item['product_id'].toString(),
                      'name': item['name'].toString(),
                      'quantity': item['quantity'].toString(),
                      'price': item['subtotal'].toString()/item['quantity'].toString(),
                      'brand': meta.marca.toString(),
                      'category': meta.categoria.toString(),
                      });

                      ga('ec:setAction', 'purchase', {
                      'id': orderObj.id.toString(),
                      });

                      ga('send', 'pageview');
                   })
         });

 </script>

```

#### TAG MANAGER METHOD

     ```javascript
    <script>
        document.addEventListener('DOMContentLoaded', function(){
            var items = Array.from(document.querySelectorAll('.item_analytics'))
            var itemsCat = Array.from(document.querySelectorAll('.itemCat_analytics'));
            var order = JSON.parse(document.querySelector('.order_analytics').innerText);
            // datos transacción
            var obj = {
                'ecommerce': {
                    'purchase': {
                        'actionField': {
                            'id': order.id.toString(),
                            'affiliation': 'Extincenter', // Affiliation or store name.
                            'revenue':parseInt(order.total),
                            'tax': parseInt(order.total_tax),
                            'shipping': parseInt(order.shipping_total),
                        },
                        'products': []
                    }
                }
            }
            //datos de productos
            items.forEach((data, index) =>{
                var item = JSON.parse(data.innerText);
                item.category = itemsCat[index].innerText
                obj.ecommerce.purchase.products.push(
                    {
                        'id': item.product_id.toString(),
                        'name': item.name.toString(),
                        'category': item.category.toString(),
                        'price': (item.subtotal / item.quantity).toString(),
                        'quantity': item.quantity,
                    }
                )
            })
            window.dataLayer = window.dataLayer || [];
            dataLayer.push(obj)
            console.log(dataLayer[1])
        });
    </script>

````




### Agregar código de Analitycs en Header

wp-content/themes/enfold/header.php

Apenas abre head
cambiar código UA-

para  habilitar el debug se agrega _debug
https://www.google-analytics.com/analytics_debug.js

```javascript

   //  <!-- Google Analytics -- ecommerce avanzado-->
   <script>
           (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
           (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
           m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
           })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

           //  window.ga_debug = {trace: true};

           ga('create', 'UA-89615303-1', 'auto');  // Replace with your property ID.
           ga('send', 'pageview');

   </script>

   // <!-- <script src="https://www.google-analytics.com/analytics_debug.js"></script>  -->

   // <!--END  Google Analytics -- ecommerce avanzado-->
````
