Table orders {
  id bigint [pk, increment]
  customer_id bigint [not null] // optionnel si tu as une table customers
  status varchar(30) [not null, default: "pending"]
  total_amount decimal(12,2) [not null, default: 0]
  currency char(3) [not null, default: "USD"]
  created_at datetime [not null]
  updated_at datetime [not null]

  Indexes {
    (customer_id)
    (status)
    (created_at)
  }
}

Table products {
  id bigint [pk, increment]
  sku varchar(64) [unique, not null]
  name varchar(255) [not null]
  description text
  price decimal(12,2) [not null, default: 0]
  stock int [not null, default: 0]
  is_active boolean [not null, default: true]
  created_at datetime [not null]
  updated_at datetime [not null]

  Indexes {
    (name)
    (is_active)
  }
}

// Pivot: lignes de commande
Table order_items {
  order_id bigint [not null]
  product_id bigint [not null]
  quantity int [not null, default: 1]
  unit_price decimal(12,2) [not null] // prix au moment de l'achat
  discount_amount decimal(12,2) [not null, default: 0]
  line_total decimal(12,2) [not null, default: 0]

  // PK composite = empêche le même produit d'être dupliqué sur la même commande
  Indexes {
    (order_id, product_id) [pk]
    (product_id)
  }
}

Ref: order_items.order_id > orders.id
Ref: order_items.product_id > products.id


