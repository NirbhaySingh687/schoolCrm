CREATE database login_form


create extension if not exists "uuid-ossp";//create the extension for uuid


CREATE TABLE user_login(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    profile varchar(255) NOT NULL,
    departments VARCHAR(255)
);

Create TABLE user_data(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    is_active BOOLEAN,
    departments VARCHAR(255),
);




INSERT INTO user_data(first_name,last_name,email,is_active,departments)
values('Nirbhay','Raghuvanshi','checking05@gmail.com',true,'Science'),
('Chetan','sharma','chetan05@gmail.com',true,'MATH'),
('Pornima','Verma','pornima12@gmail.com',true,'Math');
