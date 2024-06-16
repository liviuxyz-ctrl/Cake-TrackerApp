#!/bin/bash

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "Starting cleanup..."

if [ -d "Datavid-Cake-Tracker/env" ]; then
    echo "Removing Python virtual environment..."
    rm -rf Datavid-Cake-Tracker/env
fi

if command_exists pip; then
    echo "Uninstalling Python packages installed by pip..."
    pip freeze > installed_python_packages.txt
    xargs -a installed_python_packages.txt sudo pip uninstall -y
    rm installed_python_packages.txt
fi

REPO_DIR="Datavid-Cake-Tracker"
if [ -d "$REPO_DIR" ]; then
    echo "Removing cloned repository..."
    rm -rf $REPO_DIR
fi
if [ -d "$HOME/.nvm" ]; then
    echo "Uninstalling Node.js and npm installed by nvm..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm deactivate
    nvm uninstall --lts
    rm -rf "$NVM_DIR"
fi

if grep -q 'NVM_DIR' "$HOME/.bashrc"; then
    echo "Removing NVM environment variables from .bashrc..."
    sed -i '/NVM_DIR/d' "$HOME/.bashrc"
    sed -i '/nvm.sh/d' "$HOME/.bashrc"
    sed -i '/bash_completion/d' "$HOME/.bashrc"
fi

echo "Uninstalling system packages installed by apt-get..."
sudo apt-get remove --purge -y python3-venv python3-pip  
sudo apt-get autoremove -y
sudo apt-get clean

echo "Cleanup complete."
