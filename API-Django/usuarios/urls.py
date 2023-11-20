from rest_framework import routers
from.api import  VerificarUsuario, ObtenerUsuario, ObtenerAsistencia, AsistenciaVieset
router = routers.DefaultRouter()
from django.urls import path

# router.register('api/usuarios',UsuarioViewsets)
# router.register(')

urlpatterns = [
    path('verificar-usuario/', VerificarUsuario.as_view()),
    path('obtener-usuario/', ObtenerUsuario.as_view()),
    path('obtener-asistencias/', ObtenerAsistencia.as_view()),
    path('asistencia/', AsistenciaVieset.as_view({'get': 'list', 'post': 'create'})),
    
]