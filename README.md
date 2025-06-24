# rust-event-org-website
This project is a professional event organization website inspired by the Rust game. It serves as a platform for showcasing and managing competitive events organized by the Rustaco organization.

## Project Structure
- **public/index.html**: The main HTML file where the React app is rendered.
- **src/assets**: Directory for static assets like images and stylesheets.
- **src/components**: Contains reusable components such as:
  - `EventCard.jsx`: Displays event details.
  - `Header.jsx`: Contains the main heading and branding.
  - `Footer.jsx`: Includes copyright information and social media links.
  - `Navbar.jsx`: Provides navigation links to different pages.
- **src/pages**: Contains the main pages of the website:
  - `Home.jsx`: The landing page showcasing featured events.
  - `Events.jsx`: Lists all upcoming events.
  - `About.jsx`: Information about the organization.
  - `Contact.jsx`: A contact form for inquiries.
- **src/App.jsx**: Main application component that sets up routing and includes the header, navbar, and footer.
- **src/index.js**: Entry point of the React application.
- **package.json**: Configuration file for npm.

## Setup Instructions
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.

## Features
- Responsive design for various devices.
- Dynamic event listing with detailed information.
- Easy navigation between different sections of the website.
- Contact form for user inquiries.

## Usage Guidelines
- Modify the components in the `src/components` directory to customize the look and feel of the website.
- Update the event details in the `src/pages/Events.jsx` file to reflect upcoming events.
- Use the `src/pages/About.jsx` to provide more information about the organization and its mission.