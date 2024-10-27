# Anti-Bot Firewall

## Description
This project implements an anti-bot firewall using Node.js. It detects and blocks suspicious bot traffic based on user-agent patterns and maintains a blacklist of IPs that are denied access.

## Features
- Detects and blocks known bot user agents.
- Blocks suspicious IPs that have been identified.
- Logs all blocked IPs to a `blockedIps.json` file.
- Rate limiting to prevent abuse.
- Simple API interface for demonstration.

## Installation

### Prerequisites
- Node.js (>=12.x)
- npm (Node Package Manager)
