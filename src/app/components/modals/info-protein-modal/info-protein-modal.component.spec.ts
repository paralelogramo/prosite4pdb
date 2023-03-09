import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProtein3dComponent } from './info-protein-modal.component';

describe('SeeProtein3dComponent', () => {
  let component: SeeProtein3dComponent;
  let fixture: ComponentFixture<SeeProtein3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeProtein3dComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProtein3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
