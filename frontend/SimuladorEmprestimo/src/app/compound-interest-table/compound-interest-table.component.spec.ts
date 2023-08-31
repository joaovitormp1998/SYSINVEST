import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestTableComponent } from './compound-interest-table.component';

describe('CompoundInterestTableComponent', () => {
  let component: CompoundInterestTableComponent;
  let fixture: ComponentFixture<CompoundInterestTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundInterestTableComponent]
    });
    fixture = TestBed.createComponent(CompoundInterestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
