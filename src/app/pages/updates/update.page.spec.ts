import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePage } from './update.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

describe('UpdatePage', () => {
  let component: UpdatePage;
  let fixture: ComponentFixture<UpdatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UpdatePage,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        IonicModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePage);
    component = fixture.componentInstance;
    component.article = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      content: 'Test Content',
      category: 'Test Category',
      photoUrl: 'http://example.com/photo.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
