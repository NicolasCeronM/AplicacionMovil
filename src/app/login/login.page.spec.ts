import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { of } from 'rxjs';

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
                HttpClientTestingModule,
                RouterTestingModule,
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

    it('should navigate to home on successful login', waitForAsync(() => {
        const mockUser = {
            nombre_usuario: 'mockUser',
            contrasena: 'mockPassword',
        };

        const mockResponse = { /* Simulate a successful response */ };
        apiServiceSpy.verificarUsuario.and.returnValue(of(mockResponse));

        const navigationExtras: NavigationExtras = {
            state: { user: mockUser },
        };

        spyOn(component['router'], 'navigate').and.callThrough();

        component.user = mockUser;
        component.IrAlHome();

        fixture.whenStable().then(() => {
            expect(apiServiceSpy.verificarUsuario).toHaveBeenCalledWith(mockUser);
            expect(component['router'].navigate).toHaveBeenCalledWith(['/home'], navigationExtras);
        });
    }));

});
