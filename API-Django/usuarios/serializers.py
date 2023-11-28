from rest_framework import serializers
from .models import Usuario, TipoUsuario, Asistencia, Asignatura
from django.contrib.auth import authenticate

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=TipoUsuario
        fields='__all__'

class UsuarioSerializers(serializers.ModelSerializer):
    tipo_usuario = TipoUsuarioSerializer(read_only=True)
    class Meta:
        model=Usuario
        fields = '__all__'

class ProfesorSerializers(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields = ['id','nombre','apellido']

class AsistenciaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'

    def to_representation(self, instance):
        # Llama a la implementación predeterminada de to_representation
        data = super().to_representation(instance)

        # Agrega el campo 'hora_formateada' con la hora formateada
        data['hora_formateada'] = instance.obtener_hora_formateada()

        return data

class AsignaturaSerializers(serializers.ModelSerializer):
    class Meta:
        model=Asignatura
        fields = '__all__'
