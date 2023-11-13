from rest_framework import serializers
from .models import Usuario, TipoUsuario

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=TipoUsuario
        fields='__all__'

class UsuarioSerializers(serializers.ModelSerializer):
    tipo_usuario = TipoUsuarioSerializer(read_only=True)
    class Meta:
        model=Usuario
        fields = '__all__'

class Login(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields = ['nombre_usuario','contrasena']