import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OlvidePage } from './olvide.page';
import { ApiService } from '../service/api.service';

describe('OlvidePage', () => {
  let component: OlvidePage;
  let fixture: ComponentFixture<OlvidePage>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ApiService', ['obtenerUsuario']);

    TestBed.configureTestingModule({
      declarations: [OlvidePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: ApiService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidePage);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar para iniciar sesión en una recuperación exitosa', waitForAsync(() => {
    const mockUsername = 'mockUser';
    const mockResponse = { usuario: { nombre_usuario: mockUsername } };

    apiServiceSpy.obtenerUsuario.and.returnValue(of(mockResponse));

    const navigateSpy = spyOn(component['router'], 'navigate').and.callThrough();

    component.username = mockUsername;
    component.recuperar();

    fixture.whenStable().then(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/login'], {
        state: { username: mockUsername },
      });
    });
  }));

  // it('should show an error alert on failed recovery', waitForAsync(() => {
  //   const mockUsername = 'mockUser';
  //   const mockError = new Error('User not found');

  //   apiServiceSpy.obtenerUsuario.and.callFake(() => {
  //     return new Error(mockError);
  //   });

  //   const alertControllerSpy = spyOn(component['alertController'], 'create').and.callThrough();

  //   component.username = mockUsername;
  //   component.recuperar();

  //   fixture.whenStable().then(() => {
  //     expect(apiServiceSpy.obtenerUsuario).toHaveBeenCalledWith({ nombre_usuario: mockUsername });
  //     expect(alertControllerSpy).toHaveBeenCalledWith({
  //       header: 'Error',
  //       message: 'Usuario no encontrado',
  //       buttons: ['OK'],
  //     });
  //   });
  // }));
});
