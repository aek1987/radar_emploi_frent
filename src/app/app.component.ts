import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobsService } from './services/jobs.service';
import { JobOffer, JobsResponse, JobStatus } from './models/job.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: JobsResponse = {
    updated_at: null,
    keyword: 'devops',
    min_score: 70,
    total_analysees: 0,
    offres: []
  };

  token = '';
  refreshing = false;
  refreshMessage = '';
  openLetterIndex: number | null = null;
  loadError = '';

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.jobsService.getOffers().subscribe({
      next: (res) => {
        this.data = res;
        this.loadError = '';
      },
      error: () => {
        this.loadError = "Impossible de contacter le serveur. Vérifie que le backend est bien lancé.";
      }
    });
  }

  statusFor(job: JobOffer): JobStatus {
    if (job.score >= (this.data.min_score || 70)) return 'pass';
    if (job.score >= 40) return 'warn';
    return 'fail';
  }

  toggleLetter(index: number): void {
    this.openLetterIndex = this.openLetterIndex === index ? null : index;
  }

  onRefresh(): void {
    if (!this.token) {
      this.refreshMessage = 'Renseigne le token de rafraîchissement.';
      return;
    }
    this.refreshing = true;
    this.refreshMessage = '';
    this.jobsService.refresh(this.token).subscribe({
      next: (res) => {
        this.refreshing = false;
        this.refreshMessage = res.ok
          ? 'Analyse lancée en arrière-plan. Recharge la page dans quelques minutes.'
          : 'Erreur : ' + res.error;
      },
      error: (err) => {
        this.refreshing = false;
        this.refreshMessage = 'Erreur : ' + (err?.error?.error || err.message || 'inconnue');
      }
    });
  }
}
