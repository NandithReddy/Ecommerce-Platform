INSERT INTO public.orders (id, order_date, total_price, user_id) VALUES 
('f3daeda0-426d-4410-80d1-a36487feb794', '2025-03-09 03:35:30.34315', 2599.98, '2706bae4-9d64-4e35-a979-cae738694cb3')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.orders (id, order_date, total_price, user_id) VALUES 
('b0b6c93c-eefd-429c-acbd-20c44cbe7a77', '2025-03-23 02:35:45.399015', 3999.98, 'b883174a-b470-43ed-b74c-b0644b45b62c')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.orders (id, order_date, total_price, user_id) VALUES 
('8ddcdbe6-d0e4-4539-b81f-6f56913af5f3', '2025-03-23 02:40:01.868582', 6599.96, 'b883174a-b470-43ed-b74c-b0644b45b62c')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.orders (id, order_date, total_price, user_id) VALUES 
('4f202742-8fd5-40ee-b15e-87853cc3d946', '2025-06-07 23:35:25.414488', 0.00, 'ec0ef810-ba63-4197-b02b-b07a8075d6bb')
ON CONFLICT (id) DO NOTHING;


INSERT INTO public.order_item (id, price, product_id, quantity, order_id) VALUES 
('fbe91179-88e3-40da-bd63-5594c4d77bce', 1299.99, '8c0a6635-3ec0-41a7-bb45-c5180b083c1c', 2, 'f3daeda0-426d-4410-80d1-a36487feb794')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.order_item (id, price, product_id, quantity, order_id) VALUES 
('f875a117-d44e-4368-8654-687a89737c81', 3999.98, '984c0553-496d-4725-a80a-97d651ec4c04', 2, 'b0b6c93c-eefd-429c-acbd-20c44cbe7a77')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.order_item (id, price, product_id, quantity, order_id) VALUES 
('dec8214c-ea69-41f0-a3f6-6e51c4496657', 3999.98, '984c0553-496d-4725-a80a-97d651ec4c04', 2, '8ddcdbe6-d0e4-4539-b81f-6f56913af5f3')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.order_item (id, price, product_id, quantity, order_id) VALUES 
('3f009413-e7d3-45e4-98e3-8f4783fc5455', 2599.98, '8c0a6635-3ec0-41a7-bb45-c5180b083c1c', 2, '8ddcdbe6-d0e4-4539-b81f-6f56913af5f3')
ON CONFLICT (id) DO NOTHING;
