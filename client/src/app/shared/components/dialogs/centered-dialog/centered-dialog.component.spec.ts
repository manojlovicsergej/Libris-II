import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredDialogComponent } from './centered-dialog.component';

describe('CenteredDialogComponent', () => {
  let component: CenteredDialogComponent;
  let fixture: ComponentFixture<CenteredDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenteredDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenteredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
