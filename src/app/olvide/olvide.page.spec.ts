import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OlvidePage } from './olvide.page';
import { ApiService } from '../service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { LoginPage } from '../login/login.page';

describe('OlvidePage', () => {
  let component: OlvidePage;
  let fixture: ComponentFixture<OlvidePage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['obtenerUsuario']);
    const alertController = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [OlvidePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginPage },
        ]),
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: AlertController, useValue: alertController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidePage);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a /login en una recuperación exitosa', waitForAsync(() => {
    const mockUsername = 'n.ceron';
    const mockResponse = { usuario: { nombre_usuario: mockUsername } };

    apiServiceSpy.obtenerUsuario.and.returnValue(of(mockResponse));

    const navigateSpy = spyOn(component['router'], 'navigate').and.callThrough();

    component.username = mockUsername;
    component.recuperar();

    fixture.whenStable().then(() => {
      expect(apiServiceSpy.obtenerUsuario).toHaveBeenCalledWith({ nombre_usuario: mockUsername });
      expect(navigateSpy).toHaveBeenCalledWith(['/login'], {
        state: { username: mockUsername },
      });
    });
  }));

  it('debería mostrar una alerta de error en caso de recuperación fallida', waitForAsync(() => {
    const mockUsername = 'mockUser';
    const mockError = { status: 404, error: { message: 'Usuario no encontrado' } };

    apiServiceSpy.obtenerUsuario.and.returnValue(throwError(mockError));
    alertControllerSpy.create.and.returnValue(Promise.resolve({ present: () => Promise.resolve() } as any));

    component.username = mockUsername;
    component.recuperar();

    fixture.whenStable().then(() => {
      expect(apiServiceSpy.obtenerUsuario).toHaveBeenCalledWith({ nombre_usuario: mockUsername });
      expect(alertControllerSpy.create).toHaveBeenCalledWith({
        header: 'Error',
        message: 'Usuario no encontrado',
        buttons: ['OK'],
      });
    });
  }));
});
