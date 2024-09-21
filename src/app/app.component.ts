import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {
  LanguageSwitcherComponent
} from "./public/components/language-switcher/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatAnchor, RouterLink, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learning-center';
  options = [
    { path: '/home', title: 'Home' },
    { path: '/learning/courses', title: 'Courses' },
    { path: '/about', title: 'About' },
  ];

  constructor(private translateService: TranslateService) {
    this.translateService.use('en');
    this.translateService.setDefaultLang('en');
  }

}
