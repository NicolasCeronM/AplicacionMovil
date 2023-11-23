/*Tipo Persona*/
INSERT INTO prueba.usuarios_tipousuario VALUES (1, 'Alumno');
INSERT INTO prueba.usuarios_tipousuario VALUES (2, 'Profesor');

/*Alumnos*/
INSERT INTO prueba.usuarios_usuario VALUES (1, 'Nicolas', 'Ceron', 'n.ceron', 'ni.ceron@duocuc.cl', 12345, 1);
INSERT INTO prueba.usuarios_usuario VALUES (2, 'Benjamin', 'Barraza', 'ben.barraza', 'juan.p@duocuc.cl', 123456, 1);
INSERT INTO prueba.usuarios_usuario VALUES (3, 'Laura', 'Martínez', 'l.mart', 'laura.m@duocuc.cl', 13579, 1);
INSERT INTO prueba.usuarios_usuario VALUES (4, 'Ana', 'Ramírez', 'a.rami', 'ana.r@duocuc.cl', 98765, 1);
INSERT INTO prueba.usuarios_usuario VALUES (5, 'Felipe', 'Maranda', 'f.mar', 'felipe.m@duocuc.cl', 12345, 1);

/*Profesores*/
INSERT INTO prueba.usuarios_usuario VALUES (6, 'María', 'Fernández', 'm.fer', 'maria.f@duocuc.cl', 86420, 2);
INSERT INTO prueba.usuarios_usuario VALUES (7, 'Pedro', 'Sánchez', 'p.sanc', 'pedro.s@duocuc.cl', 20586, 2);
INSERT INTO prueba.usuarios_usuario VALUES (8, 'Sofía', 'Díaz', 's.diaz', 'sofia.d@duocuc.cl', 75319, 2);
INSERT INTO prueba.usuarios_usuario VALUES (9, 'Miguel', 'López', 'm.lopez', 'miguel.l@duocuc.cl', 61983, 2);
INSERT INTO prueba.usuarios_usuario VALUES (10, 'Elena', 'Rodríguez', 'e.rodr', 'elena.r@duocuc.cl', 29438, 2);

select * from prueba.usuarios_usuario;

