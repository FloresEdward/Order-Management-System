import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.signupForm.value).toEqual({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('should mark form controls as touched when calling markFormControlsAsTouched', () => {
    const formControls = component.signupForm.controls;
    spyOn(formControls['firstname'], 'markAsTouched');
    spyOn(formControls['lastname'], 'markAsTouched');
    spyOn(formControls['email'], 'markAsTouched');
    spyOn(formControls['password'], 'markAsTouched');
    spyOn(formControls['confirmPassword'], 'markAsTouched');

    component.markFormControlsAsTouched();

    expect(formControls['firstname'].markAsTouched).toHaveBeenCalled();
    expect(formControls['lastname'].markAsTouched).toHaveBeenCalled();
    expect(formControls['email'].markAsTouched).toHaveBeenCalled();
    expect(formControls['password'].markAsTouched).toHaveBeenCalled();
    expect(formControls['confirmPassword'].markAsTouched).toHaveBeenCalled();
  });

  it('should return true when calling isFieldInvalid with an invalid field', () => {
    const formControl = component.signupForm.controls['firstname'];
    formControl.setErrors({ required: true });
    formControl.markAsDirty();

    const result = component.isFieldInvalid('firstname');

    expect(result).toBeTrue();
  });

  it('should return false when calling isFieldInvalid with a valid field', () => {
    const formControl = component.signupForm.controls['firstname'];
    formControl.setErrors(null);
    formControl.markAsDirty();

    const result = component.isFieldInvalid('firstname');

    expect(result).toBeFalse();
  });

  it('should return null when calling matchPasswordValidator with matching passwords', () => {
    const password = 'password';
    component.signupForm.controls['password'].setValue(password);
    const formControl = { value: password };

    const result = component.matchPasswordValidator()(formControl as any);

    expect(result).toBeNull();
  });

  it('should return mismatch error when calling matchPasswordValidator with non-matching passwords', () => {
    const password = 'password';
    component.signupForm.controls['password'].setValue(password);
    const formControl = { value: 'different-password' };

    const result = component.matchPasswordValidator()(formControl as any);

    expect(result).toEqual({ mismatch: true });
  });

  // it('should call authenticationService.register and navigate to returnUrl when calling signup', () => {
  //   const userDetails = {
  //     email: 'test@example.com',
  //     password: 'password',
  //     firstname: 'John',
  //     lastname: 'Doe',
  //   };
  //   const returnUrl = '/dashboard';
  //   spyOn(authenticationService, 'register').and.returnValue({
  //     subscribe: (success: any) => {
  //       success();
  //     },
  //   });
  //   spyOn(router, 'navigateByUrl');

  //   component.returnUrl = returnUrl;
  //   component.signupForm.setValue(userDetails);
  //   component.signup();

  //   expect(authenticationService.register).toHaveBeenCalledWith(userDetails);
  //   expect(router.navigateByUrl).toHaveBeenCalledWith(returnUrl);
  // });
});

class RouterStub {
  navigateByUrl(url: string): void {}
}

class ActivatedRouteStub {
  snapshot = {
    queryParams: {
      returnUrl: '/dashboard',
    },
  };
}
