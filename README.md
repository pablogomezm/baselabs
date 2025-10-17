
To run the backend:
docker build -t bobs-corn-backend ./backend
docker run -p 3001:3001 bobs-corn-backend

To run the frontend:
docker build -t bobs-corn-frontend ./frontend
docker run -p 3000:3000 bobs-corn-frontend
