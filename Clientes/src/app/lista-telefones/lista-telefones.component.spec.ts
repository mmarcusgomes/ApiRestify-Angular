import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTelefonesComponent } from './lista-telefones.component';

describe('ListaTelefonesComponent', () => {
  let component: ListaTelefonesComponent;
  let fixture: ComponentFixture<ListaTelefonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTelefonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
