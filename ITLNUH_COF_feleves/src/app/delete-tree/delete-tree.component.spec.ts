import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTreeComponent } from './delete-tree.component';

describe('DeleteTreeComponent', () => {
  let component: DeleteTreeComponent;
  let fixture: ComponentFixture<DeleteTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
