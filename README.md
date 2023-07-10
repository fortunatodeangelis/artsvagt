![artsvagt lgo](https://github.com/fortunatodeangelis/artsvagt/assets/45572072/9d4986d0-6094-4625-8242-08f1af30028b)


**ArtSvagt** is a Danish word that translates to "species guard" in English. 🌿🐾

## Description
**ArtSvagt** is a web application that serves as a Species Vulnerability Assessment Tool. 
It provides information and data about different species based on their region, class, and category.
Users can explore and analyze various species, view their scientific names, classification, and conservation status. 
The application aims to raise awareness about endangered species and promote conservation efforts.

The data for **ArtSvagt** is sourced from the [IUCN Red List API](http://apiv3.iucnredlist.org/), which provides comprehensive information about the conservation status of species worldwide.

## Features
Browse and search for species based on region, class, and category.
View detailed information about each species, including scientific name and conservation status.
Interact with a user-friendly interface for seamless navigation and data visualization.

## Technologies Used
ArtSvagt utilizes the following technologies:
- Laravel (backend): a PHP framework for building robust and scalable web applications.
- Next.js (frontend): a React framework for building server-rendered and static websites.

## Getting Started
To run the ArtSvagt application locally, follow these steps:

### Backend (Laravel)
- Clone the repository to your local machine.
- Navigate to the backend directory: `cd backend`.
- Install the dependencies: `composer install`.
- Create a copy of the `.env.example` file and rename it to `.env`.
- Generate an application key: `php artisan key:generate`.

### Frontend (Next.js)
- Navigate to the frontend directory:  `cd frontend `.
- Install the dependencies: `yarn install`.
- Start the Next.js development server: `yarn dev`.

Once both the backend and frontend servers are running, you can access the **ArtSvagt** application by opening your web browser and visiting http://localhost:3000 and http://localhost:8000.
