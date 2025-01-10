#!/bin/bash
cd /var/app/staging
npm install -g pnpm
pnpm install
pnpm run build