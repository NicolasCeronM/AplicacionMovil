from django.db import models
from django.utils import timezone

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

class Asistencia(models.Model):

    alumno = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='asistencia_alumno')
    profesor = models.ForeignKey(Usuario,on_delete=models.CASCADE, related_name='asistencia_profesor')
    fecha = models.DateField(auto_now_add=True)
    hora = models.DateTimeField(default=timezone.now)

    def obtener_hora_formateada(self):
        # Obtener solo la hora
        hora_formateada = self.hora.strftime('%H:%M:%S')
        return hora_formateada


    def __str__(self):
       return f"Hora: {self.obtener_hora_formateada()}, Fecha: {self.fecha}"
