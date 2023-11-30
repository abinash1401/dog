import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-image-display',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './image-display.component.html',
  styleUrl: './image-display.component.css'
})
export class ImageDisplayComponent implements OnInit {

  httpClient = inject(HttpClient);

  Data: Array<string> = [];
  errorMessage: string = '';
  successMessage: string = '';
  invalidImageUrls: Set<string> = new Set<string>();

  ngOnInit(): void {
    this.fetchData();
  }

fetchData() {
  this.httpClient
    .get('https://dog.ceo/api/breeds/image/random')
    .subscribe(
      (data: any) => {
        console.log(data);
        if (data.status === 'success') {
          this.Data.push(data.message);
          this.successMessage = 'API call successful!';
          this.errorMessage = '';

          // Ensure the length of Data does not exceed 6
          if (this.Data.length > 500) {
            this.Data.shift(); // Remove the first element
          }
        } else {
          this.errorMessage = 'Error occurred during API call.';
          this.successMessage = '';
        }
        console.log('hello', this.Data);
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Error occurred during API call.';
        this.successMessage = '';
      }
    );
}

  fetchOnButtonClick() {
    this.fetchData();
  }
  handleImageError(imageSrc: string) {
    console.error(`Error loading image: ${imageSrc}`);
    this.invalidImageUrls.add(imageSrc);
    alert(`Error loading image: ${imageSrc}`);
  }

  showError(imageSrc: string): boolean {
    return this.invalidImageUrls.has(imageSrc);
  }

}

