# URL_Shortener

## Core Requirements

### 1. Frontend:
- Implement a form to submit long URLs.
- Display the generated short URL after submission.
- Include a "Copy to Clipboard" button for the short URL.
- Implement basic styling for a clean, responsive design.

### 2. Backend:
- Create an API endpoint to receive long URLs and return shortened versions.
- Implement a redirect service to handle requests for shortened URLs.
- Generate unique short codes for each submitted URL.
- Allow duplicate long URLs (each submission should create a new short URL).

### 3. Database:
- Store mappings between short codes and original URLs.
- Save creation dates for each shortened URL.

### 4. Deployment:
- Deploy the application to a publicly accessible platform.
- Provide instructions for running the project locally.

## Nice-to-have Features
If time permits, consider implementing one or more of these optional features:
1. **Password Protection**: Allow users to set a password for accessing certain shortened URLs.
2. **URL Expiry Date**: Enable users to set an expiration date for shortened URLs.
3. **Custom Short Codes**: Allow users to specify their own custom short codes.

## Technical Specifications
- **Frontend**: ReactJS
- **Backend**: Any technology of your choice (e.g., Node.js, Python)
- **Database**: Any database system (e.g., SQLite, MongoDB, PostgreSQL)

## Submission Requirements
1. **Source Code**
   - Provide a link to a GitHub repository containing your project code.
   - Ensure the repository is public or grant access to the provided email.
   
2. **README File**
   - Include setup instructions.
   - Explain your technology choices.
   - List completed features.
   - Document any known issues or limitations.
   - Suggest ideas for future improvements.

3. **Deployed Application**
   - Provide the URL of your deployed, publicly accessible application.

## Evaluation Criteria
Your submission will be evaluated based on:
1. Functionality and completeness of core features.
2. Code quality, organization, and best practices.
3. Effective use of React for frontend development.
4. Appropriate backend architecture and API design.
5. Database design and data management.
6. Error handling and input validation.
7. Successful deployment and accessibility.
8. Quality and clarity of documentation.
9. Implementation of nice-to-have feature (if attempted).

## Important Notes
- You are responsible for obtaining and using your own API keys for external services.
- Focus on core functionality over perfect styling.
- Commit your code regularly to show progress.
- If you run out of time, document the features you would add or improve given more time.

---------------------------------------------------------

# URL Shortener Backend

This is a simple URL shortener backend built with Django and React, allowing users to submit long URLs and get a shortened URL. The application includes an expiration feature, so shortened URLs expire after a certain period.

## Features

- Submit long URLs and receive a unique, shortened URL.
- Each submission generates a new short code, even for duplicate URLs.
- Expiration system for shortened URLs.
- Redirects users to the original URL when accessing the shortened URL.
- Displays a message if the link has expired.
- Simple backend homepage with access to the Django admin panel.

## Technology Choices

- **Backend**: Django (Python) with Django REST Framework.
- **Frontend**: React (JavaScript) for submitting long URLs.
- **Database**: SQLite (easy to set up for development, can be switched to PostgreSQL for production).
- **Deployment**: Heroku (for the backend), Vercel (for the frontend)
  
## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/url-shortener-backend.git
