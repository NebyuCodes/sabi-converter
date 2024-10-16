# Video to Audio Converter

A Node.js application that converts video files to audio format using FFmpeg, with the ability to specify the duration of the audio output. The project is containerized using Docker for easy deployment and scaling. It also integrates with Cloudinary for cloud storage of the converted audio files.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Building and Running the Application](#building-and-running-the-application)
- [API Endpoints](#api-endpoints)
- [Rate Limiting](#rate-limiting)
- [Clustering](#clustering)
- [Using Cloudinary](#using-cloudinary)
- [License](#license)
- [Contributing](#contributing)

## Features

- Convert video files (e.g., MP4) to audio files (e.g., MP3).
- Specify the duration of the audio output.
- Rate limiting to prevent abuse of the API.
- Clustering to handle concurrent requests efficiently.
- Dockerized for easy deployment and scaling.
- Integration with Cloudinary for cloud storage of audio files.

## Technologies Used

- Node.js
- Express
- Fluent-FFmpeg
- Docker
- Redis (optional)
- Axios (for inter-service communication)
- Cloudinary (for cloud storage)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js] (v14 or higher)
- [Docker]
- [FFmpeg] (ensure it's in your PATH) (This is only for testing FFmpeg outside docker.)
- A Cloudinary account (to store audio files)

### Installation

1. Clone the repository
2. Run the "docker-compose up --build" command using docker-compose.yml file available in the main directory. 

### Building and Running the Application
After you build the docker images for both services (videotoaudio and uploadtostorage), you can access both using the following endpoints locally.
The project implements the services mentioned above as micro-services.

FFmpeg will be installed automatically using Docker specific to the videotoaudio service since the services need it.

1. http://localhost:3002/api/v1/uploader [POST] - You don't have to use this endpoint manually since the other service uses it to upload to Cloudinary once the audio
buffer is ready.
2. http://localhost:3003/api/v1/covert [POST] - This is used to upload the video and add the job to the job queue for conversion.
3. http://localhost:3003/api/v1/convert [GET] - This is used to learn the job status inside the job queue using a job ID provided as a parameter.

### API Endpoints
You can use the shared Postman API documentation via Gmail.

### Rate Limiting
The application implements rate limiting to restrict the number of requests from a single IP address to 100 requests every 15 minutes. This helps prevent abuse of the API.

### Clustering
The application uses Node.js clustering to create multiple worker processes, allowing it to handle concurrent requests efficiently. Each worker process can serve requests independently.

### Using Cloudinary
Cloudinary Integration: The application uses Cloudinary to store the converted audio files. After processing the audio, the file is uploaded to Cloudinary, and the URL of the uploaded file is returned in the response.
Setup: Ensure that you have your Cloudinary credentials set up in your .env file as mentioned in the Installation section.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or enhancements.
