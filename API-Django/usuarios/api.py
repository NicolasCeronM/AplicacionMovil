from .models import Usuario, Asistencia
from rest_framework import viewsets, permissions
from .serializers import UsuarioSerializers, AsistenciaSerializers

class UsuarioViewsets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializers

class AsistenciaViewsets(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AsistenciaSerializers

# class Login()