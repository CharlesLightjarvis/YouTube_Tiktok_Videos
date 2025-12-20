<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function addProductToOrder(Order $order, Product $product) {
     $pivot = $order->products()->where('product_id', $product->id)->first();   

     if($pivot) {
        $order->products()->updateExistingPivot($product->id, ['quantity' => $pivot->quantity + 1]);
     } else {
        $order->products()->attach($product->id, ['quantity' => 1, 'unit_price' => $product->price]);
     }
    }

    public function removeProductFromOrder(Order $order, Product $product) {
     $order->products()->detach($product->id);
    }
}   
