from .models import Usuario, Asistencia
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import UsuarioSerializers, AsistenciaSerializers
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser


class VerificarUsuario(APIView):
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UsuarioSerializers(data=data)

        username = data['nombre_usuario']
        try:
            user = Usuario.objects.get(nombre_usuario = username)

            if user.contrasena == data['contrasena']:
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ObtenerUsuario(APIView):
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UsuarioSerializers(data=data)

        username = data['nombre_usuario']
        try:
            user = Usuario.objects.get(nombre_usuario = username)

            # Incluye el usuario en el cuerpo de la respuesta
            response_data = {
                'usuario': {
                    'id':user.id,
                    'nombre_usuario': user.nombre_usuario,
                    'nombre':user.nombre,
                    'apellido':user.apellido,
                    'correo':user.correo,
                    'tipo_usuario': {
                        'id': user.tipo_usuario.id,
                        'nombre_tipoUsuario':user.tipo_usuario.nombre_tipoUsuario,
                    },  # Agrega otros campos según tu modelo
                    # ...
                },
                'mensaje': 'Usuario encontrado correctamente',  # Puedes incluir un mensaje adicional
            }
            
            return Response(response_data,status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ObtenerAsistencia(APIView):
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        serializer = UsuarioSerializers(data=data)

        alumno_id = data['id']
        try:
            # Obtener el alumno con el ID proporcionado
            alumno = Usuario.objects.get(id=alumno_id)

            # Obtener todas las asistencias asociadas al alumno
            asistencias = Asistencia.objects.filter(alumno=alumno_id)

            # Serializar las asistencias
            asistencias_serializadas = AsistenciaSerializers(asistencias, many=True).data

            # Construir la respuesta con las asistencias
            response_data = {
                'alumno': {
                    'id': alumno.id
                      # Agrega otros campos según tu modelo
                    # ...
                },
                'asistencias': asistencias_serializadas,
                'mensaje': 'Asistencias encontradas correctamente',
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({'mensaje': 'Alumno no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

class AsistenciaVieset(viewsets.ModelViewSet):
    queryset = Asistencia.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AsistenciaSerializers
