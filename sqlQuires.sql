-- create database gym_app_pure_sql;

use gym_app_pure_sql;

create table trainer(
	id int  PRIMARY KEY AUTO_INCREMENT,
	name varchar(150),
    `from` datetime,
    `to` datetime
);


create table membership(
	id int auto_increment primary key,
	`from` datetime default current_timestamp,
	`to` datetime default current_timestamp,
    cost float not null
);

create table `member`(
	id int auto_increment primary key,
    `name` varchar(150) not null unique,
    national_id char(14),
    phone_number char(11),
    membership_id int,
    trainer_id int,
    `status` Enum('Active', 'Freeze'),
    constraint membership_fk foreign key (membership_id) references membership(id),
    constraint trainer_fk foreign key (trainer_id) references trainer(id)
);
