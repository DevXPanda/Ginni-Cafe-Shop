/*
  # Database Functions

  1. Functions
    - update_product_stock: Updates product stock after order
    - get_user_orders: Gets orders for a specific user
    - search_products: Searches products by name or description
*/

-- Function to update product stock
CREATE OR REPLACE FUNCTION update_product_stock(p_id uuid, quantity integer)
RETURNS void AS $$
BEGIN
  UPDATE products 
  SET stock = stock - quantity
  WHERE id = p_id AND stock >= quantity;
END;
$$ LANGUAGE plpgsql;

-- Function to get user orders
CREATE OR REPLACE FUNCTION get_user_orders(user_id uuid)
RETURNS TABLE (
  id uuid,
  status text,
  total_amount numeric,
  created_at timestamptz,
  items json
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.status,
    o.total_amount,
    o.created_at,
    json_agg(
      json_build_object(
        'product_id', oi.product_id,
        'quantity', oi.quantity,
        'price', oi.price,
        'product_name', p.name
      )
    ) as items
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  WHERE o.user_id = user_id
  GROUP BY o.id, o.status, o.total_amount, o.created_at
  ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;