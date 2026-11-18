import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Accueil } from './accueil';
describe('Accueil', () => {
  let fixture: ComponentFixture<Accueil>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Accueil] }).compileComponents();
    fixture = TestBed.createComponent(Accueil);
    await fixture.whenStable();
  });
  it('should create', () => { expect(fixture.componentInstance).toBeTruthy(); });
});
