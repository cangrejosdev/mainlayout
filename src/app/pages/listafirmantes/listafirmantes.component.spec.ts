import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListafirmantesComponent } from './listafirmantes.component';

describe('ListafirmantesComponent', () => {
  let component: ListafirmantesComponent;
  let fixture: ComponentFixture<ListafirmantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListafirmantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListafirmantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
