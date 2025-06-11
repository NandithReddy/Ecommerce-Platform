INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('4489dc43-670e-4284-a7cc-3f87ae72dd7b', 'test@example.com', 'John12', 'Doe12', '123456')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('b883174a-b470-43ed-b74c-b0644b45b62c', 'test@example.dsfcom', 'Johsdfn12', 'Doe12', '$2a$10$BjNG8aWw9.1VYx//SQ0dAeJ9jP9oSz8kN3VumMj1/08F.qc2GMrZS')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('2706bae4-9d64-4e35-a979-cae738694cb3', 'testuser@example.com', 'John', 'Doe', '$2a$10$ur9w1lNTT.syVajDZ4yoPeiIpCRWaIYIP.ogAtXNP4ArzNLHgEQjm')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('833fedc2-e028-4eaf-8323-8d1df7a2f4ba', 'HelloWorld', NULL, NULL, '$2a$10$p4ghi.SKQqro34gDQy9kA.IJ2qJOYdUULDysetCA7lhVtg8VnfMky')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('ec0ef810-ba63-4197-b02b-b07a8075d6bb', 'bob@example.com', 'bob', 'Smith', '$2a$10$mbcgMtFwyygy2BfQV1k/SOwrC3dbGtgdRFV2MEL7cPaRMsIBt08gu')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('18e7a4cb-e35f-495a-9c02-92b8b4c72cb0', 'alice@example.comm', NULL, NULL, '$2a$10$P3OlYMv6dXNtsUIr.pTOzuv24ozYMceIfAj6r1j0LNYDuGpUq.sdG')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('ff30052f-7872-4ebc-ba2c-daa8432f08b7', 'alice@example.com', 'Alice', 'McArthy', '$2a$10$Wtv3NPlQTgJeiUzrjh0dTOsEvjfb3hNHIYrTMOPwyp4OgO3zJGA8y')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('06a93687-b8e6-4470-a20b-3488747252b9', 'hazem@example.com', 'Hazem', 'Mohamed', '$2a$10$P0nVPD/vkQijd.JaN8NB1uTezbtgXSrEvvDMokq4tFnD/6LKeUhTW')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('380ea0d0-0b4a-43d1-b733-f40fa5630ecf', 'heqrq@afdaf.com', 'Hhh', 'hhhh', '$2a$10$/fQF6AFBTKXoE75K.rHzbebyJmc4hC9N36n3/5p7QneStNLMtzCP2')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('893d12f2-81af-4cd4-96fe-c3e405dbc5d4', 'mohamed@gmail.com', 'zeiad', 'kanawati', '$2a$10$Y4OdtFUVlBMNsb4RWyAb3OWEEON55cfkiPh9ZDJNcP.3KZYqkgRk.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('8ac25628-4244-4472-9ca3-f422679aa7e1', 'safsa@adsad.cpm', 'Mohamed', 'AA', '$2a$10$o/6.by7E6KEGMTUkOyjhE.rHuAlB6PP7nhZehHZTKlqW.aa4c7TR6')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, first_name, last_name, password) VALUES 
('7e7ee264-0776-4aa6-90a7-bba1be5cf807', 'yasso@gmail.com', 'yasso', 'kanawati', '$2a$10$Q1cE5XVdWZLfdYRit.A0AOx0CfzkgOS4yYsrrivxDY9H8be.QXItK')
ON CONFLICT (id) DO NOTHING;
