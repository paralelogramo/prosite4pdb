import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRightClickMenuComponent } from './link-right-click-menu.component';

describe('LinkRightClickMenuComponent', () => {
  let component: LinkRightClickMenuComponent;
  let fixture: ComponentFixture<LinkRightClickMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkRightClickMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkRightClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
