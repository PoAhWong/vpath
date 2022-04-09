CREATE DATABASE vpath_db;
\c vpath_db

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    password_digest TEXT
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    user_id INT,
    title TEXT,
    content TEXT,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE
)

INSERT INTO notes(user_id, title, content) VALUES (5, 'Component', 'finish notes function');