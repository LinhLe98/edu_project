import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registration-cta.component.html',
  styleUrl: './registration-cta.component.css',
})
export class RegistrationCtaComponent {}
