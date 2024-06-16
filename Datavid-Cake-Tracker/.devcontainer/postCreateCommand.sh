#!/bin/bash

cd "$(dirname "$0")/.."

echo "Setting up Python virtual environment..."
python3 -m venv env
source env/bin/activate

echo "Installing Django and Django REST framework..."
pip install django djangorestframework

BACKEND_DIR="datavid-cake-tracker-backend"
if [ ! -d "$BACKEND_DIR" ]; then
    echo "Creating Django backend directory..."
    mkdir -p $BACKEND_DIR
    cd $BACKEND_DIR
    echo "Starting Django project..."
    django-admin startproject datavid_cake_tracker .
    django-admin startapp members
else
    cd $BACKEND_DIR
fi

echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

FRONTEND_DIR="../datavid-cake-tracker-frontend/datavid-cake_app"
if [ ! -d "$FRONTEND_DIR" ]; then
    echo "Creating React frontend directory..."
    mkdir -p $FRONTEND_DIR
    cd $FRONTEND_DIR
    echo "Setting up React frontend with Vite (TypeScript + SWC)..."
    npm create vite@latest . -- --template react-ts
    npm install
else
    cd $FRONTEND_DIR
    npm install
fi

echo "Setup complete. To start the development servers, use the following commands:"
echo "Django backend: cd datavid-cake-tracker-backend && source ../env/bin/activate && python manage.py runserver"
echo "React frontend: cd datavid-cake-tracker-frontend/datavid-cake_app && npm run dev"
