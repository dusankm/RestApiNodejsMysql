create database company;
use company;
create  table inventory (
	id INT(11)NOT null auto_increment,
    name varchar(45) default null,
    stock int(11) default null,
    primary key(id)
);

describe inventory;