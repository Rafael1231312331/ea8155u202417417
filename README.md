
# Paws & Claws Pet Rescue & Shelter Management Platform
## Overview
A web frontend application developed for Paws & Claws Pet Rescue & Shelter Management to manage animal shelter locations and log individual rescued pet intakes with capacity control and dynamic breed verification. It integrates dog breeds and preview imagery from the external Dog CEO API and branding via Logo.dev.

## Authorship
- Student Name: Rafael André Barrenechea Bustamante
- Student Code: u202417417
- NRC: 8155
## Architecture
The project follows a Domain-Driven Design (DDD) layered architecture:
- shared
  - infrastructure/services: Centralized Axios HTTP client.
  - presentation/components: Top Toolbar and Collapsible Sidebar with navigation and language selector.
  - presentation/views: Dynamic 404 Page Not Found view.
- animals
  - domain/model: ShelterLocation and ShelterAnimal domain entities.
  - application/assemblers: ShelterAnimalAssembler for resource-to-entity mapping.
  - application/store: Centralized Pinia store managing shelter locations, animal intakes, and capacity metrics.
  - infrastructure/services: AnimalsService for backend REST API communication.
  - presentation/views: Home view with 2-column Shelter Location Summary cards, and New Animal Intake form view.
  - presentation/components: ShelterLocationSummary component.
- breeds
  - domain/model: DogBreed domain entity.
  - application/assemblers: DogBreedAssembler for Dog CEO API data transformation.
  - infrastructure/services: BreedsService for breed catalog and random image retrieval.
## Technical Stack & Dependencies
- Vue 3.5 (Composition API with script setup)
- Vite
- PrimeVue 4 (Aura Theme preset)
- Pinia (State Management Store)
- Vue Router (with semantic child routes)
- Vue I18n (English default, Spanish support)
- PrimeFlex & PrimeIcons
- Axios
## Features
- Top Toolbar with Logo.dev Logo API (pawsandclaws.org), rescue tagline, and Sidebar trigger button.
- Collapsible Sidebar with Home and New Animal Intake navigation links and language switcher (EN | ES).
- Home view displaying mission statement and a responsive grid of Shelter Location Summary cards (2 per row on desktop).
- Location Summary cards displaying location name, list of rescued pets with breed (or "No Animals" state), total animals, and available capacity.
- New Animal Intake form with location-filtered breed selection from Dog CEO API, real-time breed image preview, automatic date population, and capacity constraint validation preventing intakes beyond maximum capacity.
- Page Not Found view reporting unhandled route paths.
- Accessible interface with ARIA attributes.
## Getting Started
1. Install Dependencies: npm install
2. Start Fake API Server (Terminal 1): npm run server
3. Start Frontend Development Server (Terminal 2): npm run dev
4. Build for Production: npm run build

