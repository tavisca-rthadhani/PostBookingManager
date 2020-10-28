import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: new ConfirmDialogModel ( 'title', 'Successful message')}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on confirm should call the function to close the dialog', () => {
    const spy = jest.spyOn(component.dialogRef, 'close');
    component.onConfirm();
    expect(spy).toHaveBeenCalled();
  });

  it('on dismiss should call the function to close the dialog', () => {
    const spy = jest.spyOn(component.dialogRef, 'close');
    component.onDismiss();
    expect(spy).toHaveBeenCalled();
  });

});
