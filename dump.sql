--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plans_id_seq OWNER TO postgres;

--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: subscribes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    plan integer NOT NULL,
    subscription_date date DEFAULT now() NOT NULL,
    delivery_day text NOT NULL,
    delivery_cep text NOT NULL,
    delivery_number text NOT NULL,
    delivery_address text,
    delivery_recipient text
);


ALTER TABLE public.subscribes OWNER TO postgres;

--
-- Name: subscribes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribes_id_seq OWNER TO postgres;

--
-- Name: subscribes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribes_id_seq OWNED BY public.subscribes.id;


--
-- Name: subscribes_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribes_products (
    id integer NOT NULL,
    subscribe_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.subscribes_products OWNER TO postgres;

--
-- Name: subscribes_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscribes_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subscribes_products_id_seq OWNER TO postgres;

--
-- Name: subscribes_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscribes_products_id_seq OWNED BY public.subscribes_products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    is_subscriber boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: subscribes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes ALTER COLUMN id SET DEFAULT nextval('public.subscribes_id_seq'::regclass);


--
-- Name: subscribes_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes_products ALTER COLUMN id SET DEFAULT nextval('public.subscribes_products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (id, name) FROM stdin;
1	Mensal
2	Semanal
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name) FROM stdin;
1	Chás
2	Incensos
3	Produtos Orgânicos
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
29	3	adf487aa-76f9-49e4-a67e-e77aa4e37861
30	3	8e2d663a-5eb1-459d-88aa-375ed5d50082
31	3	2b813b23-4ca6-4549-bc66-8d97c70afd69
32	3	44c2ad22-9e0c-4b1d-9988-fc76d8be2f13
33	3	988a8323-a91a-4b8f-ad36-f789be8c668b
34	4	166d12de-f175-41c4-9c93-5dc961fb8319
35	3	10537008-fbf2-4d6b-83a9-a15d7dd31859
36	3	0614eace-9c60-4d6d-a547-45eec34b82f2
37	4	08cca457-9a8f-4610-a363-6e96686e52ce
38	4	d039d34e-8210-4886-bd5a-48daddba6267
39	3	c16dd823-4026-49b2-95a0-2872a6331a73
40	7	9caee751-2a95-4921-a85c-7fa4165f33df
41	7	ed367aba-0fdb-4559-bf9e-07aeff9df656
\.


--
-- Data for Name: subscribes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribes (id, user_id, plan, subscription_date, delivery_day, delivery_cep, delivery_number, delivery_address, delivery_recipient) FROM stdin;
48	3	1	2021-11-22	10	63105010	511	Rua Carolino Sucupira	samuel
49	4	2	2021-11-22	Quarta	63105010	555	Rua Carolino Sucupira 	xarope
\.


--
-- Data for Name: subscribes_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribes_products (id, subscribe_id, product_id) FROM stdin;
87	48	1
88	48	2
89	48	3
90	49	1
91	49	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, is_subscriber) FROM stdin;
3	Samuel	samuelfelipef@gmail.com	$2b$10$6H4ctLGr8V9mtY5ral4VRO8Rv8bHc8ieNdpcKk3FzzZbo1Ze4ErFa	t
4	xaropinho	xarope@email.com	$2b$10$VFi0dtE5GKP/.yJCFI7Cdu06pMP6VQVji1wcQfhtdBvC/0UE8ZFuG	t
7	Teste	emailteste@email.com	$2b$10$B.c5mR5B8mfQFAbLxDW2ieIq/GwOARiUg88fZNQyLejU4A6q1saq.	f
\.


--
-- Name: plans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 41, true);


--
-- Name: subscribes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribes_id_seq', 49, true);


--
-- Name: subscribes_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribes_products_id_seq', 91, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: plans plans_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pk PRIMARY KEY (id);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: subscribes subscribes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes
    ADD CONSTRAINT subscribes_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: subscribes subscribes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes
    ADD CONSTRAINT subscribes_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: subscribes subscribes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes
    ADD CONSTRAINT subscribes_fk1 FOREIGN KEY (plan) REFERENCES public.plans(id);


--
-- Name: subscribes_products subscribes_products_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes_products
    ADD CONSTRAINT subscribes_products_fk0 FOREIGN KEY (subscribe_id) REFERENCES public.subscribes(id);


--
-- Name: subscribes_products subscribes_products_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribes_products
    ADD CONSTRAINT subscribes_products_fk1 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

