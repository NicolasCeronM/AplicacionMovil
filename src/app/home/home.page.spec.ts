import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Aumentar el tiempo de espera para las pruebas asincrónicas
beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // (ajusta según sea necesario)
});

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let emailComposerSpy: jasmine.SpyObj<EmailComposer>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['obtenerUsuario', 'asistencia', 'obtenerAsistencia']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const emailSpy = jasmine.createSpyObj('EmailComposer', ['open']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: AlertController, useValue: alertSpy },
        { provide: EmailComposer, useValue: emailSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    emailComposerSpy = TestBed.inject(EmailComposer) as jasmine.SpyObj<EmailComposer>;
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia llamar obtenerUsuario y cargarlo en usuario al cargar ngOnInit', () => {
    const mockResponse = {
      usuario: {
        id: 1,
        nombre_usuario: 'n.ceron',
        nombre: 'Nicolas',
        apellido: 'Ceron',
        correo: 'ni.ceron@duocuc.cl',
        tipo_usuario: {
          id: 1,
          nombre_tipoUsuario: 'Alumno'
        }
      },
      mensaje: 'Usuario encontrado correctamente'
    };

    // Modifica el objeto para tener un valor definido para nombre_usuario
    const mockRequest = { nombre_usuario: 'n.ceron' };

    apiServiceSpy.obtenerUsuario.and.returnValue(of(mockResponse));

    // Establece el valor para nombre_usuario en tu componente antes de llamar a ngOnInit
    component.nombre_usuario = mockRequest;

    component.ngOnInit();

    // Ajusta el valor en el expect para que coincida con el valor que estableciste
    expect(apiServiceSpy.obtenerUsuario).toHaveBeenCalledWith(mockRequest);
    expect(component.usuario).toEqual(mockResponse.usuario);
  });


  it('Deberia generar codigo QR', () => {
    // Crea un usuario ficticio para la prueba
    const mockUsuario = {
      nombre: 'John',
      apellido: 'Doe',
      correo: 'john.doe@example.com',
    };

    // Asigna el usuario ficticio a tu componente
    component.usuario = mockUsuario;

    // Llama a la función para generar el código QR
    component.generarCodigoQR();

    // Verifica que la propiedad qrData se haya actualizado correctamente
    const expectedQRData = JSON.stringify(mockUsuario);
    expect(component.qrData).toEqual(expectedQRData);
  });



});