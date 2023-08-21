import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletechildComponent } from './deletechild.component';

describe('DeletechildComponent', () => {
  let component: DeletechildComponent;
  let fixture: ComponentFixture<DeletechildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletechildComponent]
    });
    fixture = TestBed.createComponent(DeletechildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
