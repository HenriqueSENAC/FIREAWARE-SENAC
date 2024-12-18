create database db_fwpp;
use db_fwpp;

create table cadastro(
id int primary key auto_increment, 
email varchar(255) not null unique, 
senha varchar(255) not null,
cel varchar(255) not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
profile_img VARCHAR(255) DEFAULT 'default.png'
);

create table catalog(
id int primary key auto_increment,
item_name varchar(255) not null,
item_description varchar(4000) not null,
item_link varchar(255) not null,
item_img varchar(255) not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE markers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    estabelecimento VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-29.788342316014266, -51.1504125286338

insert into cadastro(id, email, senha, cel)
values (1, "senac@senacrs.edu.br", "12345", "99 99999-9999");

drop table cadastro;
select * from cadastro;	

insert into catalog(id, item_name, item_description, item_link, item_img)
values (1, "henrique", "extintor, antigo", "urllalalal", "123");

drop table catalog;	
select * from catalog;	