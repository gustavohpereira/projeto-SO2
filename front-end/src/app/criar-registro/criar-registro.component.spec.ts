import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarRegistroComponent } from './criar-registro.component';

describe('CriarRegistroComponent', () => {
  let component: CriarRegistroComponent;
  let fixture: ComponentFixture<CriarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
