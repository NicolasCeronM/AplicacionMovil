import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { OlvidePage } from './olvide.page';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular';

describe('OlvidePage', () => {
  let component: OlvidePage;
  let fixture: ComponentFixture<OlvidePage>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;
  let mockNavController: jasmine.SpyObj<NavController>;

  beforeEach(
    waitForAsync(() => {
      mockApiService = jasmine.createSpyObj('ApiService', ['get']);
      mockAlertController = jasmine.createSpyObj('AlertController', ['create']);
      mockNavController = jasmine.createSpyObj('NavController', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [OlvidePage],
        imports: [IonicModule],
        providers: [
          { provide: ApiService, useValue: mockApiService },
          { provide: AlertController, useValue: mockAlertController },
          { provide: NavController, useValue: mockNavController },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(OlvidePage);
      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call api.get() on ngOnInit', () => {
    const mockUsuarios = [{ nombre_usuario: 'usuario1', contrasena: 'contrasena1' }];
    mockApiService.get.and.returnValue(of(mockUsuarios));

    component.ngOnInit();

    expect(component.usuarios).toEqual(mockUsuarios);
    expect(mockApiService.get).toHaveBeenCalled();
  });

});
