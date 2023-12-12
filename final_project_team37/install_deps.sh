#!/bin/bash
echo "Starting installs"

# Go to backend folder and run scripts
cd backend && npm install cors express nodemon mongodb 


# Go to frontend folder and run scripts
cd frontend && npm install bootstrap bootstrap-react axios react-router-dom react-toastify


# $SHELL
