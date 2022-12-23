import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRightClickMenuComponent } from './button-right-click-menu.component';

describe('ButtonRightClickMenuComponent', () => {
  let component: ButtonRightClickMenuComponent;
  let fixture: ComponentFixture<ButtonRightClickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRightClickMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRightClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
