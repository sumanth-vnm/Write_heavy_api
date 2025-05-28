# Custom Analytics API Project

## Problem Statement
Build a custom analytics API similar to Segment.io with a write-heavy ingestion endpoint for logging and visualizing data.

### Key Components
- Write-heavy ingestion endpoint
- CDN for JS tracking snippet
- Asynchronous processing using queue-based systems (RabbitMQ/Kafka)
- Admin dashboard for querying logs with filters

### Technical Highlights
- Event-driven architecture
- Implementation of Observer and Command design patterns
- Database options:
  - ClickHouse with partitioning
  - PostgreSQL with partitioning
  - Redis for deduplication
- Optional real-time event preview via WebSocket

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Install RabbitMQ:
- For Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install rabbitmq-server
sudo systemctl start rabbitmq-server
```

3. Run the API:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /track
- Track events with the following payload:
```json
{
    "event_type": "string",
    "properties": {
        "key": "value"
    },
    "timestamp": "2025-05-28T09:47:35+05:30",
    "user_id": "string",
    "session_id": "string"
}
```

### GET /health
- Check API health status

## Project Questions (May 26th, 2025)
1. What data will be collected?
2. How to implement relational data structure for normalization?
3. CDN implementation:
   - Multiple server setup
   - Distributed system architecture

## Technical Considerations
- Consideration of using Go (preferred by companies)
- Focus on system design after requirements are finalized
- Learning new technologies and concepts

## Deliverables
1. API that can:
   - Accept input data
   - Store data in S3
   - Target: June 4th, 2025
2. Dockerized and deployed solution
3. Additional deliverables to be determined (TBD)

## Project Kickoff Meeting Notes
### Date: May 25th, 2025

#### Attendees
- Project Manager
- Team Members

#### Topics Discussed
- Write-heavy ingestion endpoint for payment processing
- High volume API call handling
- Docker-friendly codebase
- AWS-compatible architecture
- Similar to Segment.io
- Focus on handling high throughput
- Performance metrics tracking

#### User Types
1. Backend Developers
   - Using upload() API for data submission
2. End Users
   - Example: Navigation system users

#### Timeline
| Event | Date/Deadline | Requirements |
|-------|---------------|--------------|
| Requirements & Tech Stack | May 26th, 2025 | Initial prototype |
| Prototype | June 5th, 2025 | - |

#### Action Items
- TBD

#### Notes
- Meeting notes and discussions from the project kickoff meeting.




