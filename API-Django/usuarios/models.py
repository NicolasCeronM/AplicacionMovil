from django.db import models

# Create your models here.

class TipoUsuario(models.Model):
    nombre_tipoUsuario = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre_tipoUsuario

class Usuario(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    nombre_usuario = models.CharField(max_length=50)
    correo = models.EmailField(max_length=254)
    contrasena = models.CharField(max_length=50)
    tipo_usuario = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.nombre_usuario