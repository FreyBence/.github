import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTreeComponent } from './update-tree.component';

describe('UpdateTreeComponent', () => {
  let component: UpdateTreeComponent;
  let fixture: ComponentFixture<UpdateTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
