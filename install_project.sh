#!/bin/bash

cp .env.example .env && \  
npm install && \  
npm run docker:up && \
npm run db:migrate && \
echo "Project installed and ready to run"