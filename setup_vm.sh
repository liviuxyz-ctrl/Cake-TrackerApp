#!/bin/bash

# Function to check for command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Update the system and install dependencies
echo "Updating the system and installing dependencies..."
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y python3 python3-venv python3-pip curl git

# Configure Git user details
echo "Configuring Git user details..."
git config --global user.email "liviu2002liviu@gmail.com"
git config --global user.name "liviuxyz-ctrl"

# Install nvm (Node Version Manager)
if ! command_exists nvm; then
    echo "Installing NVM (Node Version Manager)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
else
    echo "NVM is already installed."
fi

# Install Node.js (latest LTS version)
if ! command_exists node || ! command_exists npm; then
    echo "Installing Node.js (latest LTS version)..."
    nvm install --lts
    nvm use --lts
else
    echo "Node.js is already installed."
fi

# Get the absolute path of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure the Python virtual environment is set up
echo "Setting up Python virtual environment..."
python3 -m venv $SCRIPT_DIR/env
source $SCRIPT_DIR/env/bin/activate

# Install Django and Django REST framework
echo "Installing Django and Django REST framework..."
pip install django djangorestframework

# Navigate to the backend directory
BACKEND_DIR="$SCRIPT_DIR/Datavid-Cake-Tracker/datavid-cake-tracker-backend"
if [ -d "$BACKEND_DIR" ]; then
    cd $BACKEND_DIR
    echo "Applying migrations..."
    python manage.py makemigrations
    python manage.py migrate
else
    echo "Backend directory does not exist. Please ensure the correct directory structure."
    exit 1
fi

# Navigate to the frontend directory and install dependencies
FRONTEND_DIR="$SCRIPT_DIR/Datavid-Cake-Tracker/datavid-cake-tracker-frontend/datavid-cake_app"
if [ -d "$FRONTEND_DIR" ]; then
    cd $FRONTEND_DIR
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend directory does not exist. Please ensure the correct directory structure."
    exit 1
fi

# Instructions to start the development servers
echo "Setup complete. To start the development servers, use the following commands:"
echo "Django backend: cd datavid-cake-tracker-backend && source ../env/bin/activate && python manage.py runserver"
echo "React frontend: cd datavid-cake-tracker-frontend/datavid-cake_app && npm run dev"
