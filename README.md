# Encryptify

Securely send encrypted messages using steganography and RSA encryption.

## Overview

The Encrypted Data Sending Model is a project that allows users to send confidential messages securely. The sender encrypts a message using RSA encryption, and the encrypted message is then hidden within an image using steganography. The receiver can extract the hidden message using the provided public key and decrypt it to obtain the original content.

## Features

- End-to-end encryption using RSA algorithm.
- Message hiding using steganography for increased security.
- Frontend built with Nuxt.js.
- Backend implemented in Python using Flask.
- User-friendly web interface.

## Getting Started

### Prerequisites

- Node.js and npm for the frontend (install using [Node.js website](https://nodejs.org/)).
- Python for the backend (install using [Python website](https://www.python.org/)).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ayush-Agarwala/Encryptify1.git

2. Navigate to the project directory:

    ```bash
    cd Encryptify1
3. Install frontend dependencies:

    ```bash
    cd frontend
    npm install
4. Install backend dependencies:

    ```bash
    cd ../backend
    pip install -r requirements.txt

## Usage
1. Frontend
    Navigate to the frontend folder:

    ```bash
    cd frontend
    npm run dev


2. Backend
    Navigate to the backend folder:

    ```bash
    cd backend
    python xorcode.py


## Folder Structure
- frontend: Contains the React.js frontend code.
- backend: Includes the Flask backend code.

## Technologies Used
- React.js
- Flask
- RSA Encryption
- Steganography
