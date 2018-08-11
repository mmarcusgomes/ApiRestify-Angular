create database bdcliente;
use bdcliente;
create table telefone(
id int not null auto_increment primary key,
clientecpf int not null  ,
numtelefone varchar(15) not null,

FOREIGN KEY (clientecpf) REFERENCES cliente(cpf)
);

create table Cliente(
id int  not null auto_increment,
cpf int not null unique ,
nome varchar(40) not null,
email varchar(40) not null,
situacao boolean,
primary key(id)
);
