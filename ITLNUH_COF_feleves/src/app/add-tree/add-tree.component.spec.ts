import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTreeComponent } from './add-tree.component';

describe('AddTreeComponent', () => {
  let component: AddTreeComponent;
  let fixture: ComponentFixture<AddTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
