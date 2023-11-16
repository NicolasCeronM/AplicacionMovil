from rest_framework import routers
from.api import UsuarioViewsets, AsistenciaViewsets

router = routers.DefaultRouter()

router.register('api/usuarios',UsuarioViewsets)
router.register('api/asitencia',AsistenciaViewsets)

urlpatterns = router.urls