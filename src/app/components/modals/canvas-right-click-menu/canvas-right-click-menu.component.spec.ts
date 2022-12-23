import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasRightClickMenuComponent } from './canvas-right-click-menu.component';

describe('CanvasRightClickMenuComponent', () => {
  let component: CanvasRightClickMenuComponent;
  let fixture: ComponentFixture<CanvasRightClickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasRightClickMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasRightClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
