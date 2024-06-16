#!/bin/bash

# Array of ports to check
PORTS=(8000 3000)

# Function to kill a process running on a specified port
kill_process_on_port() {
    local PORT=$1
    local PID=$(lsof -t -i :$PORT)

    if [ -z "$PID" ]; then
        echo "No process found running on port $PORT."
    else
        echo "Killing process $PID running on port $PORT..."
        kill -9 $PID

        if [ $? -eq 0 ]; then
            echo "Process $PID on port $PORT killed successfully."
        else
            echo "Failed to kill process $PID on port $PORT."
        fi
    fi
}

# Loop through the array of ports and kill processes
for PORT in "${PORTS[@]}"; do
    kill_process_on_port $PORT
done
