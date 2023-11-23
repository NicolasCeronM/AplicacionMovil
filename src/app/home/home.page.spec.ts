import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner, BarcodeScannerPlugin, ScanResult, } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import SpyObj = jasmine.SpyObj; 



// Aumentar el tiempo de espera para las pruebas asincrónicas
beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000; // (ajusta según sea necesario)
});

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let emailComposerSpy: jasmine.SpyObj<EmailComposer>;
  let router: Router;
  let barcodeScannerSpy: SpyObj<BarcodeScannerPlugin>;


  beforeEach(waitForAsync(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['obtenerUsuario', 'asistencia', 'obtenerAsistencia']);
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const emailSpy = jasmine.createSpyObj('EmailComposer', ['open']);
    const barcodeScanner = jasmine.createSpyObj('BarcodeScanner', ['checkPermission', 'openAppSettings']);

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
    barcodeScannerSpy = jasmine.createSpyObj('BarcodeScannerPlugin', ['prepare', 'startScan', 'hideBackground', 'showBackground', 'checkPermission', 'openAppSettings', 'getTorchState']);


    
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

  it('Debe cargar asistencia para el usuario', async () => {
    const mockUsuario = { id: 1 }; // Define un objeto de usuario con un ID
    component.usuario = mockUsuario; // Asigna el usuario al componente

    const mockAsistencia = [{ id: 1, fecha: '2023-01-01', hora: '08:00:00' }, { id: 2, fecha: '2023-01-02', hora: '10:30:00' }];

    // Configura el servicio para devolver la asistencia simulada
    apiServiceSpy.obtenerAsistencia.and.returnValue(of(mockAsistencia));

    // Llama a la función que se está probando
    await component.cargarAsistencia();

    // Verifica que la asistencia en el componente se haya actualizado correctamente
    expect(component.asistencia).toEqual(mockAsistencia);

    // Verifica que el servicio se haya llamado con el ID correcto del usuario
    expect(apiServiceSpy.obtenerAsistencia).toHaveBeenCalledWith({ id: component.usuario.id });
  });

  it('debería manejar el error al cargar la asistencia', async () => {
    // Configura el servicio para devolver un error
    apiServiceSpy.obtenerAsistencia.and.returnValue(throwError('Error al cargar asistencia'));

    // Espía console.log antes de que se llame a la función
    spyOn(console, 'log');

    // Antes de llamar a cargarAsistencia, inicializa component.usuario con un valor de ejemplo
    component.usuario = { id: 1, nombre_usuario: 'ejemplo', nombre: 'Ejemplo', apellido: 'Usuario', correo: 'ejemplo@correo.com', tipo_usuario: { id: 1, nombre_tipoUsuario: 'Alumno' } };

    // Llama a la función que se está probando
    await component.cargarAsistencia();

    // Verifica que la asistencia en el componente siga siendo indefinida (o cualquier valor predeterminado que tenga)
    expect(component.asistencia).toBeUndefined();

    // Verifica que se haya registrado un mensaje de error en la consola
    expect(console.log).toHaveBeenCalledWith('Error al cargar asistencia');
  });

});