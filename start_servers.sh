#!/bin/bash

# Function to open a new terminal window and run a command
open_new_terminal() {
    local command=$1
    if command_exists gnome-terminal; then
        gnome-terminal -- bash -c "$command; exec bash"
    elif command_exists xterm; then
        xterm -e "$command; bash"
    elif command_exists konsole; then
        konsole -e "$command; bash"
    else
        echo "No suitable terminal application found to run the commands."
        echo "Please open a terminal manually and run the following commands:"
        echo "$command"
    fi
}

# Function to check for command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get the absolute path of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

BACKEND_DIR="$SCRIPT_DIR/Datavid-Cake-Tracker/datavid-cake-tracker-backend"
FRONTEND_DIR="$SCRIPT_DIR/Datavid-Cake-Tracker/datavid-cake-tracker-frontend/datavid-cake_app"

BACKEND_COMMAND="cd $BACKEND_DIR && source $SCRIPT_DIR/env/bin/activate && python manage.py runserver"
FRONTEND_COMMAND="cd $FRONTEND_DIR && npm install && npm run dev"

echo "Starting Django backend..."
open_new_terminal "$BACKEND_COMMAND"

echo "Starting React frontend..."
open_new_terminal "$FRONTEND_COMMAND"

echo "Both servers are starting in separate terminal windows."

