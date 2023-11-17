from .models import Usuario, Asistencia
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializers, AsistenciaSerializers
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password

class UsuarioViewsets(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializers

class AsistenciaViewsets(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AsistenciaSerializers

    