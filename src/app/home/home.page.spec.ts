import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../service/api.service';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['obtenerUsuario', 'obtenerAsistencia', 'asistencia']);
  const emailComposerSpy = jasmine.createSpyObj('EmailComposer', ['open']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: activatedRouteSpy },
          { provide: ApiService, useValue: apiServiceSpy },
          { provide: EmailComposer, useValue: emailComposerSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a obtenerUsuario cuando se llama a ngOnInit', () => {
    const mockUsuario = { id: 1, nombre: 'John', apellido: 'Doe', correo: 'john.doe@example.com' };
    
    // Configura el objeto ActivatedRouteSnapshot con los parámetros simulados
    const activatedRouteSnapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', [], { queryParams: { user: { nombre_usuario: 'mockUser' } } });
    
    activatedRouteSpy.snapshot = activatedRouteSnapshot;
    apiServiceSpy.obtenerUsuario.and.returnValue(of({ usuario: mockUsuario }));
  
    component.ngOnInit();
  
    expect(apiServiceSpy.obtenerUsuario).toHaveBeenCalledWith({ nombre_usuario: 'mockUser' });
    expect(component.usuario).toEqual(mockUsuario);
  });
  

  it('debe navegar para iniciar sesión cuando se llame a salir', () => {
    component.salir();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('debería manejar el escaneo exitoso en startScan', async () => {
    spyOn(BarcodeScanner, 'checkPermission').and.returnValue(Promise.resolve({ granted: true }));
    spyOn(BarcodeScanner, 'startScan').and.returnValue(Promise.resolve({ content: 'yourContent', format: 'QR_CODE' } as ScanResult));
    apiServiceSpy.asistencia.and.returnValue(of({}));

    await component.startScan();

    expect(apiServiceSpy.asistencia).toHaveBeenCalled();
    // Add more expectations as needed
  });

  it('debería manejar los permisos denegados en startScan', async () => {
    spyOn(BarcodeScanner, 'checkPermission').and.returnValue(Promise.resolve({ denied: true }));

    await component.startScan();

    // Add expectations for handling denied permissions
  });

  it('debería manejar errores en startScan', async () => {
    spyOn(BarcodeScanner, 'checkPermission').and.returnValue(Promise.reject('Permission error'));

    await component.startScan();

    // Add expectations for handling errors
  });

  // Add more test cases as needed
});
