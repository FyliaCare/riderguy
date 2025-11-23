# Auth Service

Authentication and authorization microservice for RiderGuy platform.

## Features

- User registration and login
- JWT-based authentication
- Refresh token mechanism
- Two-factor authentication (2FA) with TOTP
- Password reset flow
- Session management
- Role-based access control (RBAC)

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Password Management

- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with token
- `POST /api/v1/auth/change-password` - Change password (authenticated)

### Two-Factor Authentication

- `POST /api/v1/auth/2fa/enable` - Enable 2FA
- `POST /api/v1/auth/2fa/verify` - Verify 2FA setup
- `POST /api/v1/auth/2fa/disable` - Disable 2FA

### Session Management

- `GET /api/v1/auth/sessions` - Get all active sessions
- `DELETE /api/v1/auth/sessions/:sessionId` - Revoke session

## Environment Variables

```env
PORT=4001
NODE_ENV=development
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
DATABASE_URL=postgresql://...
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3000
```

## Development

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build
npm run build

# Start production
npm start
```

## Testing

```bash
npm test
```
