import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('debe llamar a verificarUsuario y devolver datos', waitForAsync(() => {
    const mockBody = { nombre_usuario: 'n.ceron', contrasena: '12345' };
    const mockResponse = { /* tu respuesta simulada aquí */ };

    spyOn(apiService['http'], 'post').and.returnValue(of(mockResponse));

    apiService.verificarUsuario(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  }));

  it('debe llamar a obtenerUsuario y devolver datos', waitForAsync(() => {
    const mockBody = { nombre_usuario: "n.ceron" };
    const mockResponse = {
      "usuario": {
        "id": 1,
        "nombre_usuario": "n.ceron",
        "nombre": "Nicolas",
        "apellido": "Ceron",
        "correo": "ni.ceron@duocuc.cl",
        "tipo_usuario": {
          "id": 1,
          "nombre_tipoUsuario": "Alumno"
        }
      },
      "mensaje": "Usuario encontrado correctamente"
    };

    spyOn(apiService['http'], 'post').and.returnValue(of(mockResponse));

    apiService.obtenerUsuario(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  }));

  it('debe llamar a obtenerAsistencia y devolver datos', waitForAsync(() => {
    const mockBody = { "id":1 };
    const mockResponse = {
      "alumno": {
        "id": 1
      },
      "asistencias": [
        {
          "id": 10,
          "fecha": "2023-11-19",
          "hora": "2023-11-19T04:06:19Z",
          "alumno": 1,
          "profesor": 8
        },
        {
          "id": 12,
          "fecha": "2023-11-19",
          "hora": "2023-11-19T04:06:36Z",
          "alumno": 1,
          "profesor": 7
        },
        {
          "id": 14,
          "fecha": "2023-11-19",
          "hora": "2023-11-19T17:34:54.058649Z",
          "alumno": 1,
          "profesor": 8
        },
        {
          "id": 15,
          "fecha": "2023-11-20",
          "hora": "2023-11-20T20:54:38.099992Z",
          "alumno": 1,
          "profesor": 10
        },
        {
          "id": 16,
          "fecha": "2023-11-20",
          "hora": "2023-11-20T21:39:40.560503Z",
          "alumno": 1,
          "profesor": 9
        },
        {
          "id": 17,
          "fecha": "2023-11-20",
          "hora": "2023-11-20T22:40:58.631772Z",
          "alumno": 1,
          "profesor": 10
        }
      ],
      "mensaje": "Asistencias encontradas correctamente"
    };

    spyOn(apiService['http'], 'post').and.returnValue(of(mockResponse));

    apiService.obtenerAsistencia(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  }));

  it('debe llamar a asitencia y devolver datos', waitForAsync(() => {
    const mockBody = { 
      "alumno":1,
      "profesor":7
    };
    const mockResponse = {
      "id": 18,
      "fecha": "2023-11-20",
      "hora": "2023-11-20T23:19:43.220722Z",
      "alumno": 1,
      "profesor": 7
    };

    spyOn(apiService['http'], 'post').and.returnValue(of(mockResponse));

    apiService.asistencia(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  }));
});
