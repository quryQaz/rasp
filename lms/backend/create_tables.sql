CREATE TABLE IF NOT EXISTS users (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) UNIQUE NOT NULL,
    identifier VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS user_messages (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
    Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100) NOT NULL,
    starttime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UserId uuid NOT NULL,
    accesstoken CHAR(250) NOT NULL,
    refreshtoken CHAR(250) NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (UserId) REFERENCES users(Id)
);

-- Вставка данных в таблицу товаров
INSERT INTO products (name, description, price, in_stock) VALUES
('Наушники Bluetooth', 'Беспроводные наушники с высоким качеством звука и шумоподавлением.', 7999.99, TRUE),
('Кофемашина', 'Автоматическая кофемашина для быстрого приготовления эспрессо и капучино.', 25000.00, TRUE),
('Смартфон', 'Смартфон с большим экраном, отличной камерой и высокой производительностью.', 49999.00, FALSE),
('Электронная книга', 'Легкая и компактная электронная книга с подсветкой и водонепроницаемым корпусом.', 8999.00, TRUE),
('Умные часы', 'Умные часы с мониторингом здоровья, спортивными функциями и долгим временем работы от аккумулятора.', 12999.00, FALSE),
('Фитнес-браслет', 'Фитнес-браслет для мониторинга активности и здоровья, с подсчетом шагов и калорий.', 2999.00, TRUE),
('Портативная колонка', 'Портативная Bluetooth-колонка с водонепроницаемым корпусом и длительным временем работы.', 4500.00, FALSE),
('Компьютерная мышь', 'Беспроводная мышь с высокой точностью отслеживания и удобной формой.', 1500.00, TRUE),
('Игровой ноутбук', 'Мощный игровой ноутбук с высококачественным дисплеем и быстрой графикой.', 120000.00, FALSE),
('Стиральная машина', 'Энергоэффективная стиральная машина с большим выбором программ стирки.', 29999.00, TRUE),
('Микроволновая печь', 'Микроволновая печь с функцией гриля и автоматическими программами приготовления.', 8500.00, FALSE),
('Пылесос робот', 'Робот-пылесос с функцией влажной уборки и системой обхода препятствий.', 19999.00, TRUE),
('Блендер', 'Многофункциональный блендер с несколькими скоростями и режимами измельчения.', 3200.00, FALSE);
