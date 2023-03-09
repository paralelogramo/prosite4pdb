import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAminoGapComponent } from './set-amino-gap.component';

describe('SetAminoGapComponent', () => {
  let component: SetAminoGapComponent;
  let fixture: ComponentFixture<SetAminoGapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAminoGapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAminoGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
