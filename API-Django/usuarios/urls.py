from rest_framework import routers
from.api import UsuarioViewsets

router = routers.DefaultRouter()

router.register('api/usuarios',UsuarioViewsets)

urlpatterns = router.urls