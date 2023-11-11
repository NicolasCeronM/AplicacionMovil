import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../service/api.service';
import { AlertController, IonicModule } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockActivatedRoute: ActivatedRoute;
  let mockRouter: Router;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;
  let mockEmailComposer: jasmine.SpyObj<EmailComposer>;

  beforeEach(
    waitForAsync(() => {
      mockActivatedRoute = { queryParams: of({ user: { correo: 'correo@example.com' } }) } as any;
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
      mockApiService = jasmine.createSpyObj('ApiService', ['get']);
      mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
      mockEmailComposer = jasmine.createSpyObj('EmailComposer', ['open']);

      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [IonicModule],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Router, useValue: mockRouter },
          { provide: ApiService, useValue: mockApiService },
          { provide: AlertController, useValue: mockAlertController },
          { provide: EmailComposer, useValue: mockEmailComposer },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('salir should remove items from localStorage and navigate to /login', () => {
    spyOn(localStorage, 'removeItem');
    component.salir();
    expect(localStorage.removeItem).toHaveBeenCalledWith('ingresado');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('sumarNumeros should return correct sum', () => {
    const result = component.sumarNumeros(5, 3);
    expect(result).toEqual(8);
  });
});
