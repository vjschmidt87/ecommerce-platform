-- E-Commerce Platform Seed Data
-- This script runs automatically on first PostgreSQL container startup

-- Categories
INSERT INTO category (id, name, description, image_url) VALUES
  (1, 'Electronics', 'Smartphones, laptops, tablets, and other electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
  (2, 'Clothing', 'Men''s and women''s apparel, shoes, and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'),
  (3, 'Books', 'Fiction, non-fiction, textbooks, and more', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
  (4, 'Home & Kitchen', 'Furniture, appliances, cookware, and home decor', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'),
  (5, 'Sports & Outdoors', 'Fitness equipment, outdoor gear, and sportswear', 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400'),
  (6, 'Beauty & Personal Care', 'Skincare, makeup, grooming, and wellness products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400')
ON CONFLICT (id) DO NOTHING;

-- Update category sequence
SELECT setval('category_id_seq', (SELECT MAX(id) FROM category));

-- Products - Electronics
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (1, 'Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support. Features adaptive sound control and multipoint connection.', 299.99, 150, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 1, NOW(), true),
  (2, 'Ultra-Slim Laptop 14"', 'Lightweight 14-inch laptop with 12th Gen processor, 16GB RAM, 512GB SSD, and a stunning 2.8K OLED display. Perfect for professionals on the go.', 1249.99, 45, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 1, NOW(), true),
  (3, 'Smartphone Pro Max', 'Flagship smartphone with 6.7-inch Super Retina display, triple camera system with 48MP main sensor, A17 chip, and all-day battery life.', 1099.00, 200, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 1, NOW(), true),
  (4, 'Wireless Earbuds Pro', 'True wireless earbuds with spatial audio, adaptive transparency, and personalized spatial audio. Up to 6 hours of listening time.', 179.99, 300, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400', 1, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Products - Clothing
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (5, 'Classic Fit Oxford Shirt', 'Timeless button-down oxford shirt crafted from premium cotton. Available in multiple colors. Machine washable and wrinkle-resistant.', 59.99, 500, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', 2, NOW(), true),
  (6, 'Slim Fit Chino Pants', 'Modern slim-fit chinos made from stretch cotton twill. Comfortable for all-day wear with a clean, tailored look.', 49.99, 350, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', 2, NOW(), true),
  (7, 'Running Sneakers Ultra', 'High-performance running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.', 129.99, 200, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 2, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Products - Books
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (8, 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin''s classic guide to writing clean, maintainable code. Essential reading for every software developer.', 39.99, 100, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 3, NOW(), true),
  (9, 'Designing Data-Intensive Applications', 'Martin Kleppmann''s comprehensive guide to the principles and practices of data systems. Covers distributed systems, databases, and stream processing.', 44.99, 80, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 3, NOW(), true),
  (10, 'The Pragmatic Programmer', 'Updated 20th anniversary edition. Timeless lessons on software development, from career growth to architectural techniques.', 42.99, 120, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400', 3, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Products - Home & Kitchen
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (11, 'Stainless Steel Cookware Set (10-Piece)', 'Professional-grade tri-ply stainless steel cookware set. Includes fry pans, saucepans, stockpot, and lids. Dishwasher and oven safe.', 299.99, 60, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', 4, NOW(), true),
  (12, 'Smart Coffee Maker', 'WiFi-enabled programmable coffee maker with 12-cup capacity. Control from your phone, schedule brews, and adjust strength settings.', 89.99, 150, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', 4, NOW(), true),
  (13, 'Ergonomic Office Chair', 'Adjustable lumbar support, breathable mesh back, 4D armrests, and seat depth adjustment. Supports up to 300 lbs.', 449.99, 40, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400', 4, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Products - Sports & Outdoors
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (14, 'Yoga Mat Premium 6mm', 'Extra-thick non-slip yoga mat with alignment markings. Made from eco-friendly TPE material. Includes carrying strap.', 34.99, 400, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 5, NOW(), true),
  (15, 'Adjustable Dumbbell Set', 'Space-saving adjustable dumbbells ranging from 5 to 52.5 lbs. Quick-change weight selection with dial mechanism.', 349.99, 75, 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 5, NOW(), true),
  (16, 'Hiking Backpack 45L', 'Lightweight and durable hiking backpack with rain cover, hydration sleeve, and multiple compartments. Ventilated back panel.', 89.99, 100, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 5, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Products - Beauty & Personal Care
INSERT INTO product (id, name, description, price, stock_quantity, image_url, category_id, created_at, active) VALUES
  (17, 'Vitamin C Brightening Serum', 'Advanced formula with 20% Vitamin C, Hyaluronic Acid, and Vitamin E. Brightens skin, reduces dark spots, and boosts collagen production.', 28.99, 250, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', 6, NOW(), true),
  (18, 'Electric Facial Cleansing Brush', 'Sonic vibration technology with 5 speed settings and 3 interchangeable brush heads. Waterproof and USB rechargeable.', 49.99, 180, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', 6, NOW(), true),
  (19, 'Natural Bamboo Toothbrush Set (4-Pack)', 'Eco-friendly bamboo toothbrushes with charcoal-infused BPA-free bristles. Biodegradable handles with color-coded bases.', 12.99, 600, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', 6, NOW(), true),
  (20, 'Aromatherapy Essential Oil Diffuser', 'Ultrasonic cool mist diffuser with 7 LED color options, timer settings, and whisper-quiet operation. 300ml capacity.', 39.99, 200, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400', 6, NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Update product sequence
SELECT setval('product_id_seq', (SELECT MAX(id) FROM product));

-- Demo admin user (password: admin123 - BCrypt encoded)
INSERT INTO users (id, email, password, first_name, last_name, role, created_at) VALUES
  (1, 'admin@shop.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', 'ADMIN', NOW())
ON CONFLICT (email) DO NOTHING;

-- Update users sequence
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
