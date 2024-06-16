#!/bin/bash

# Check if port number is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <port>"
  exit 1
fi

PORT=$1

# Find the process ID (PID) using the specified port
PID=$(lsof -t -i :$PORT)

# Check if a process is found
if [ -z "$PID" ]; then
  echo "No process found running on port $PORT."
  exit 0
fi

# Kill the process
echo "Killing process $PID running on port $PORT..."
kill -9 $PID

# Confirm the process is killed
if [ $? -eq 0 ]; then
  echo "Process $PID killed successfully."
else
  echo "Failed to kill process $PID."
fi

