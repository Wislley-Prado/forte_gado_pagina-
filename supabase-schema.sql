create table if not exists site_content (
  id text primary key default 'fortegado-premium',
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists kits (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bags text not null,
  ideal text not null,
  price text not null,
  economy text not null,
  badge text not null,
  checkout text not null,
  highlighted boolean not null default false,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists client_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client text not null,
  location text not null,
  url text not null,
  badge text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  text text not null,
  rating int not null default 5,
  image text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Ative RLS antes de publicar e crie politicas conforme o tipo de acesso:
-- leitura publica para a pagina, escrita apenas para usuario admin autenticado.
alter table site_content enable row level security;
alter table kits enable row level security;
alter table client_videos enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;

insert into site_content (id, content)
values ('fortegado-premium', '{}'::jsonb)
on conflict (id) do nothing;

create policy "Public can read site content"
on site_content for select
using (id = 'fortegado-premium');

-- Politica simples para o admin atual sem login. Funciona, mas qualquer pessoa
-- com a chave publica poderia alterar o JSON se descobrir o endpoint.
-- Para produção, substitua por autenticação e restrinja por usuario admin.
create policy "Public can update site content for admin prototype"
on site_content for insert
with check (id = 'fortegado-premium');

create policy "Public can upsert site content for admin prototype"
on site_content for update
using (id = 'fortegado-premium')
with check (id = 'fortegado-premium');
