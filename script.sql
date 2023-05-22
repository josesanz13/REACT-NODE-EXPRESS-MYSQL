--  Tabla Usuarios
create table users (
	id int not null AUTO_INCREMENT,
    name varchar(60) not null,
    last_name varchar(60) null,
    email varchar(100) not null unique,
    password varchar(100) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id)
)

--  Tabla Tareas
create table tasks (
	id int not null AUTO_INCREMENT,
    description varchar(300) not null,
	title varchar(50) not null,
    status char(1) not null,
    user_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)