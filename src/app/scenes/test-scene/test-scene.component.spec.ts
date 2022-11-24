import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSceneComponent } from './test-scene.component';

describe('TestSceneComponent', () => {
  let component: TestSceneComponent;
  let fixture: ComponentFixture<TestSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSceneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
