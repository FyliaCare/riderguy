# RiderGuy API Documentation

Base URL: `https://api.riderguy.io/api/v1`

## Authentication

All authenticated endpoints require a Bearer token:

```
Authorization: Bearer <access_token>
```

### Get Access Token

**POST** `/auth/login`

```json
{
  "email": "rider@example.com",
  "password": "password123",
  "twoFactorCode": "123456" // optional, if 2FA enabled
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "rider@example.com",
      "role": "rider"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "sessionId": "session_123"
  }
}
```

---

## Riders

### Get Rider Profile

**GET** `/riders/{riderId}`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Rider",
    "email": "john@example.com",
    "phone": "+1234567890",
    "regionId": "uuid",
    "status": "active",
    "rating": 4.8,
    "level": 5,
    "xp": 1250,
    "isAvailable": true,
    "profileImage": "https://...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### Update Availability

**PATCH** `/riders/{riderId}/availability`

**Body:**
```json
{
  "isAvailable": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isAvailable": true
  }
}
```

### Upload Document

**POST** `/riders/{riderId}/documents`

**Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Body:**
```
documentType: drivers_license
file: <binary>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "documentType": "drivers_license",
    "status": "pending",
    "uploadedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Tasks

### Get Available Tasks

**GET** `/tasks/available?lat=40.7128&lon=-74.0060&limit=10`

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude
- `limit` (optional): Max results (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "pickupAddress": {
        "street": "123 Main St",
        "city": "New York",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "dropoffAddress": {
        "street": "456 Oak Ave",
        "city": "New York",
        "latitude": 40.7580,
        "longitude": -73.9855
      },
      "distance": 2500, // meters
      "estimatedTime": 25, // minutes
      "earnings": 12.50,
      "priority": "high",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Accept Task

**POST** `/tasks/{taskId}/accept`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "accepted",
    "acceptedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Start Task

**POST** `/tasks/{taskId}/start`

**Body:**
```json
{
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "in_progress",
    "startedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Complete Task

**POST** `/tasks/{taskId}/complete`

**Body:**
```json
{
  "proofOfDelivery": {
    "type": "photo",
    "photo": ["https://s3.../proof1.jpg"],
    "signature": "data:image/png;base64,...",
    "notes": "Delivered to reception",
    "location": {
      "latitude": 40.7580,
      "longitude": -73.9855
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "completedAt": "2024-01-01T00:00:00Z",
    "earnings": 12.50
  }
}
```

---

## Wallet

### Get Wallet Balance

**GET** `/wallet`

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 523.75,
    "currency": "USD",
    "pendingHold": 45.20,
    "totalEarnings": 2150.00,
    "totalWithdrawals": 1580.00
  }
}
```

### Get Transactions

**GET** `/wallet/transactions?page=1&limit=20`

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "amount": 12.50,
        "type": "earning",
        "status": "completed",
        "description": "Task #1234 completed",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### Request Withdrawal

**POST** `/wallet/withdraw`

**Body:**
```json
{
  "amount": 100.00,
  "method": "bank_transfer",
  "bankAccount": {
    "accountNumber": "****1234",
    "bankCode": "123456"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": "uuid",
    "amount": 100.00,
    "status": "pending",
    "estimatedCompletionTime": "2024-01-02T00:00:00Z"
  }
}
```

---

## Training

### Get Available Courses

**GET** `/training/courses?category=safety&level=1`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Safety Basics",
      "description": "Learn fundamental safety practices",
      "duration": 45, // minutes
      "level": 1,
      "category": "safety",
      "mandatory": true,
      "thumbnailUrl": "https://...",
      "progress": {
        "status": "not_started",
        "completedLessons": 0,
        "totalLessons": 5
      }
    }
  ]
}
```

### Get Course Details

**GET** `/training/courses/{courseId}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Safety Basics",
    "description": "Learn fundamental safety practices",
    "lessons": [
      {
        "id": "uuid",
        "title": "Introduction to Safety",
        "contentType": "video",
        "duration": 10,
        "sortOrder": 1,
        "completed": false
      }
    ]
  }
}
```

### Complete Lesson

**POST** `/training/courses/{courseId}/lessons/{lessonId}/complete`

**Response:**
```json
{
  "success": true,
  "data": {
    "lessonId": "uuid",
    "completed": true,
    "xpAwarded": 10
  }
}
```

### Submit Quiz

**POST** `/training/courses/{courseId}/quiz/submit`

**Body:**
```json
{
  "answers": [
    {
      "questionId": "uuid",
      "answer": "Option A"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "passed": true,
    "certificateUrl": "https://s3.../certificate.pdf",
    "xpAwarded": 50
  }
}
```

---

## Community

### Get Channels

**GET** `/community/channels`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "General",
      "description": "General discussions",
      "type": "general",
      "memberCount": 1250,
      "isPrivate": false
    }
  ]
}
```

### Get Posts

**GET** `/community/channels/{channelId}/posts?page=1&limit=20`

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "author": {
          "id": "uuid",
          "name": "John Rider",
          "level": 5
        },
        "content": "Great day today! Completed 15 deliveries.",
        "attachments": [],
        "likes": 23,
        "replyCount": 5,
        "isPinned": false,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 350
    }
  }
}
```

### Create Post

**POST** `/community/channels/{channelId}/posts`

**Body:**
```json
{
  "content": "Just completed my first delivery! 🎉",
  "attachments": ["https://s3.../photo.jpg"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "Just completed my first delivery! 🎉",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Welfare

### Get Insurance Plans

**GET** `/welfare/insurance/plans`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Basic Coverage",
      "premium": 25.00,
      "coverage": [
        {
          "type": "accident",
          "limit": 10000,
          "deductible": 500
        }
      ]
    }
  ]
}
```

### Enroll in Insurance

**POST** `/welfare/insurance/enroll`

**Body:**
```json
{
  "planId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "enrollmentId": "uuid",
    "status": "active",
    "enrolledAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2025-01-01T00:00:00Z"
  }
}
```

### Request Emergency Fund

**POST** `/welfare/emergency-fund/request`

**Body:**
```json
{
  "amount": 200.00,
  "reason": "Vehicle repair",
  "urgency": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "uuid",
    "status": "pending",
    "amount": 200.00,
    "submittedAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Incidents

### Report Incident

**POST** `/incidents`

**Body:**
```json
{
  "type": "accident",
  "severity": "high",
  "description": "Minor vehicle collision",
  "taskId": "uuid",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "evidence": ["https://s3.../photo1.jpg"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "reported",
    "referenceNumber": "INC-2024-001234",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Optional additional context
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or expired token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

---

## Rate Limiting

**Limits:**
- Authenticated: 1000 requests per 15 minutes
- Anonymous: 100 requests per 15 minutes

**Headers:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1640000000
```

---

## Webhooks

Subscribe to events via webhooks:

**POST** `/webhooks/subscribe`

```json
{
  "url": "https://your-server.com/webhook",
  "events": ["task.completed", "wallet.transaction.completed"],
  "secret": "your-webhook-secret"
}
```

Webhook payload:
```json
{
  "event": "task.completed",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    "taskId": "uuid",
    "riderId": "uuid",
    "earnings": 12.50
  },
  "signature": "sha256=..."
}
```
