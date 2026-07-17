import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sample-amplify-app';
  
  // Pricing Calculator State
  billingCycle: 'monthly' | 'yearly' = 'yearly';
  userCount = 10;
  baseMonthlyRate = 12; // $12 per user per month
  
  get calculatedPrice(): number {
    const total = this.userCount * this.baseMonthlyRate;
    return this.billingCycle === 'yearly' ? Math.round(total * 0.8 * 12) : total; // 20% discount for yearly
  }
  
  get displayPeriod(): string {
    return this.billingCycle === 'yearly' ? 'yr' : 'mo';
  }

  // Accordion / FAQs State
  faqs = [
    {
      question: 'What is this Angular template designed for?',
      answer: 'This template showcases modern Angular 19 features optimized for deployment on AWS Amplify. It includes interactive elements like calculations, bindings, and micro-animations.',
      open: false
    },
    {
      question: 'Does AWS Amplify support Angular?',
      answer: 'Yes, AWS Amplify fully supports hosting frontend Single Page Applications (SPAs) built with Angular. It automates build processes, deploys files to a secure CDN, and supports custom domains.',
      open: false
    },
    {
      question: 'How do I connect this app to my AWS Amplify account?',
      answer: 'You can deploy it directly via Git integration (GitHub, GitLab) through the AWS Amplify console, or by building it locally and dragging the dist/ folder to the Amplify console.',
      open: false
    },
    {
      question: 'Can I add a backend later?',
      answer: 'Absolutely. AWS Amplify makes it easy to add serverless backends (APIs, Databases, Authentication) to your Angular application using the Amplify CLI or Gen 2 code-first DX.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  // Contact Form State
  contactData = {
    name: '',
    email: '',
    message: ''
  };
  formSubmitted = false;
  isSubmitting = false;

  submitForm() {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      alert('Please fill out all fields.');
      return;
    }
    
    this.isSubmitting = true;
    
    // Simulate API request
    setTimeout(() => {
      this.isSubmitting = false;
      this.formSubmitted = true;
      
      // Reset form
      this.contactData = {
        name: '',
        email: '',
        message: ''
      };
    }, 1500);
  }
}
