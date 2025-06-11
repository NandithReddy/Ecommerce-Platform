INSERT INTO public.products (id, name, description, price, stock) VALUES 
('623c280b-79b9-4232-9ab1-cd5bad4e335b', 'Noise-Cancelling Headphones', 'Over-ear Bluetooth headphones with ANC', 199.99, 999)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('6b7602c0-423c-43c3-b58c-95ab402fdb68', '4K UHD Monitor', '27-inch 4K IPS display with HDR support', 429.99, 99)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('8c0a6635-3ec0-41a7-bb45-c5180b083c1c', 'Gaming Laptop', 'High-performance laptop with RTX 3060', 1299.99, 9999)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('984c0553-496d-4725-a80a-97d651ec4c04', 'Ultra Gaming Laptop', 'Upgraded to RTX 4080', 1999.99, 99999)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('9e489def-a5e6-4139-972a-5a45a68adf7e', 'Wireless Gaming Mouse', 'Ergonomic mouse with adjustable DPI & RGB', 59.99, 99)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('be6f6471-9cd5-484a-b2e2-fa945274100b', 'Keyboard', 'Mechanical keyboard', 99.99, 9999)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, description, price, stock) VALUES 
('d0821ddc-449f-4c07-bdd2-457aaf8e941a', 'VR Immersion Headset', 'High-resolution VR headset with built-in audio', 349.99, 9999)
ON CONFLICT (id) DO NOTHING;
