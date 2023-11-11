// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { IonicModule, NavController } from '@ionic/angular';
// import { of } from 'rxjs';
// import { LoginPage } from './login.page';
// import { ApiService } from '../service/api.service';
// import { AlertController } from '@ionic/angular';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   let mockApiService: jasmine.SpyObj<ApiService>;
//   let mockAlertController: jasmine.SpyObj<AlertController>;
//   let mockNavController: jasmine.SpyObj<NavController>;

//   beforeEach(
//     waitForAsync(() => {
//       mockApiService = jasmine.createSpyObj('ApiService', ['get']);
//       mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
//       mockNavController = jasmine.createSpyObj('NavController', ['navigateForward']);

//       TestBed.configureTestingModule({
//         declarations: [LoginPage],
//         imports: [RouterTestingModule, IonicModule],
//         providers: [
//           { provide: ApiService, useValue: mockApiService },
//           { provide: AlertController, useValue: mockAlertController },
//           { provide: NavController, useValue: mockNavController },
//         ],
//       }).compileComponents();

//       fixture = TestBed.createComponent(LoginPage);
//       component = fixture.componentInstance;
//     })
//   );

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should load users from ApiService on ngOnInit', () => {
//     const mockUsuarios = [{ nombre_usuario: 'usuario1', contrasena: 'contrasena1' }];
//     mockApiService.get.and.returnValue(of(mockUsuarios));

//     component.ngOnInit();

//     expect(component.usuarios).toEqual(mockUsuarios);
//     expect(mockApiService.get).toHaveBeenCalled();
//   });

//   it('should navigate to home on successful login', async () => {
//     const mockUsuario = { nombre_usuario: 'usuario1', contrasena: 'contrasena1' };
//     component.usuarios = [mockUsuario];
//     component.user = { username: 'usuario1', password: 'contrasena1' };

//     await component.IrAlHome();

//     expect(localStorage.getItem('user')).toEqual(JSON.stringify(component.user));
//     expect(localStorage.getItem('ingresado')).toEqual('true');
//     expect(mockAlertController.create).not.toHaveBeenCalled();
//     expect(mockNavController.navigateForward).toHaveBeenCalledWith('/home');
//   });

//   it('should show an alert on unsuccessful login', async () => {
//     const mockUsuario = { nombre_usuario: 'usuario1', contrasena: 'contrasena1' };
//     component.usuarios = [mockUsuario];
//     component.user = { username: 'usuario2', password: 'contrasena2' };

//     await component.IrAlHome();

//     expect(localStorage.getItem('user')).toBeNull();
//     expect(localStorage.getItem('ingresado')).toBeNull();
//     expect(mockAlertController.create).toHaveBeenCalled();
//     expect(mockNavController.navigateForward).not.toHaveBeenCalled();
//   });
// });
