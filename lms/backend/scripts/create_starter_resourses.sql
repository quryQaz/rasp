
-- create admin user (NOT REAL USER JUST DEVELOPMENT)
INSERT INTO UserLogin values ('00000000-0000-0000-0000-000000000000', 'admin', 'password`', '[]') ON CONFLICT DO NOTHING;

-- create main roles
INSERT INTO Role values ('student', '[]', '[]') ON CONFLICT DO NOTHING;
INSERT INTO Role values ('lecturer', '[]', '[]') ON CONFLICT DO NOTHING;
