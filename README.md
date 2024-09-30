# URL Shortener Website
This project is a simple URL shortener with a ReactJS frontend and a Django backend. The project allows users to submit long URLs, generate shortened URLs that will expired after a set amount of time.

## 🚀 Live Demo

- **Frontend URL**: [https://url-shortener-mu-six.vercel.app/](https://url-shortener-mu-six.vercel.app/)
- **Backend URL**: [https://url-shorterner-binhpq-f721b6699005.herokuapp.com/](https://url-shorterner-binhpq-f721b6699005.herokuapp.com/)

## A. Completed and Pending Features

✅ - Completed features

⚠️ - Works in progress

❌ - Have not implement

### 1. Frontend:

✅ Implement a form to submit long URLs.

✅ Display the generated short URL after submission.

✅ Include a "Copy to Clipboard" button for the short URL.

✅ Implement basic styling for a clean, responsive design.


### 2. Backend:

✅ Create an API endpoint to receive long URLs and return shortened versions.

✅ Implement a redirect service to handle requests for shortened URLs.

✅ Generate unique short codes for each submitted URL.

✅ Allow duplicate long URLs (each submission should create a new short URL).


### 3. Database:

✅ Store mappings between short codes and original URLs.

✅ Save creation dates for each shortened URL, accessible through the Admin page on Backend.

##### Admin Access

- **Username**: `admin`
- **Password**: `admin`


### 4. Deployment:

✅ Deploy the application to a publicly accessible platform.

✅ Provide instructions for running the project locally (below).

### 5. Nice-to-have Features:

❌ Password Protection: Allow users to set a password for accessing certain shortened URLs.

⚠️ URL Expiry Date: Enable users to set an expiration date for shortened URLs. (Currently the expired date is set to default of 60 seconds and user can't toggle it off).

❌ Custom Short Codes: Allow users to specify their own custom short codes.

---

## B. Technology Stack

- **Backend**: Django (Python) with Django REST Framework.
- **Frontend**: React (JavaScript) for submitting long URLs.
- **Database**: SQLite (easy to set up for development, can be switched to PostgreSQL for production).
- **Deployment**: Heroku (for the backend), Vercel (for the frontend)

---

## C. Running the Project Locally

### Prerequisites

- Node.js installed (for frontend)
- Python 3.12.5 or higher installed (for backend)

### Setup Instructions

#### 1. Clone the repository

Run the following commands in your terminal

```bash
git https://github.com/BinhPQ2/URL_Shortener.git
cd url-shortener
```

##### 1.1. Frontend Setup (ReactJS)

Open the `frontend/.env` file and change the `REACT_APP_API_URL` to point to your local backend. Change the line:

```
REACT_APP_API_URL = https://url-shorterner-binhpq-f721b6699005.herokuapp.com/api 
```

to 

```
REACT_APP_API_URL = http://127.0.0.1:8000/api
```
Next, in your terminal, type:

```bash
cd frontend
npm install
npm start
```

This will start the React frontend at `http://localhost:3000/`.

##### 1.2. Backend Setup (Django)

Navigate to the backend folder in your terminal and run:

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

This will start the Django backend at `http://127.0.0.1:8000`.

---

## D. Known Issues & Limitations

- **Password Protection**: Not implemented. Users cannot set passwords for accessing certain URLs.
- **Custom Short Codes**: The option for users to set their own custom short codes is not yet available.
  
---

## E. Future Improvements

- **Password Protection**: Allow users to protect shortened URLs with a password.
- **Custom Short Codes**: Enable users to create custom short codes for easier sharing.
- **URL Expiry Date**: Finish the features that let users to set an expiry date for their shortened URLs.
- **Enhanced UI/UX**: Improve the frontend styling to offer a more polished and responsive user experience.
- **Heroku PostgreSQL**: Optimize the application for production deployment on Heroku using PostgreSQL.
- **Docker Container**: Create a Docker container for the application to streamline the development and deployment process.