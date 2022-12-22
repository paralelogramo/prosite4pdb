import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectAminoComponent } from './modal-select-amino.component';

describe('ModalSelectAminoComponent', () => {
  let component: ModalSelectAminoComponent;
  let fixture: ComponentFixture<ModalSelectAminoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectAminoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectAminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
