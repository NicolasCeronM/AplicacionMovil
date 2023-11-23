import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { NavigationExtras } from '@angular/router';

import { LoginPage } from './login.page';
import { ApiService } from '../service/api.service';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    beforeEach(waitForAsync(() => {
        const spy = jasmine.createSpyObj('ApiService', ['verificarUsuario']);

        TestBed.configureTestingModule({
            declarations: [LoginPage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),  // Agregamos RouterTestingModule con rutas vacías
            ],
            providers: [
                { provide: ApiService, useValue: spy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('deberia navegar al home logiado correctamente', waitForAsync(() => {
        const mockUser = {
            nombre_usuario: 'n.ceron',
            contrasena: '12345',
        };

        const mockResponse = { /* Simulate a successful response */ };
        apiServiceSpy.verificarUsuario.and.returnValue(of(mockResponse));

        const navigateSpy = spyOn(component['router'], 'navigate').and.stub();  // Cambiamos 'callThrough' a 'stub'
        const setItemSpy = spyOn(localStorage, 'setItem');

        component.user = mockUser;
        component.IrAlHome();

        fixture.whenStable().then(() => {
            expect(apiServiceSpy.verificarUsuario).toHaveBeenCalledWith(mockUser);
            expect(navigateSpy).toHaveBeenCalledWith(['/home'], jasmine.any(Object));  // Verificamos que se llamó con la ruta '/home'
            expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
            expect(setItemSpy).toHaveBeenCalledWith('ingresado', 'true');
        });
    }));

    it('debería mostrar una alerta de error en caso de usuario o contraseña incorrectos', async () => {
        const mockError = new Error('Usuario o contraseña incorrecto');
        apiServiceSpy.verificarUsuario.and.returnValue(throwError(mockError));
      
        const alertControllerSpy = spyOn(component['alertController'], 'create').and.callThrough();
      
        component.user = { "nombre_usuario":"n.ceron", "contrasena":"1222" };
        await component.IrAlHome();
      
        fixture.whenStable().then(() => {
          expect(alertControllerSpy).toHaveBeenCalledWith({
            header: 'Error',
            message: 'Usuario o contraseña incorrecto', // Cambié la capitalización aquí
            buttons: ['OK'],
          });
        });
      });
      
});
