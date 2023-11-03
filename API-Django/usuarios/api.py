from .models import Usuario
from rest_framework import viewsets, permissions
from .serializers import UsuarioSerializers

class UsuarioViewsets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializers

# class Login()