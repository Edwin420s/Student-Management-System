# Ikonex Academy - Student Management System

A comprehensive web-based Student Management System built for Ikonex Academy assessment.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with HttpOnly cookies
- **PDF Generation**: React PDF

## Features

- Class Stream Management (CRUD)
- Student Management (CRUD with search)
- Subject Management (CRUD)
- Exam Management (CRUD)
- Bulk Score Entry with duplicate prevention
- Ranking Engine (subject and class positions)
- Grading Scale System
- PDF Report Cards
- Class Performance Reports
- Dashboard with statistics

## Project Structure

```
student-management-system/
├── Client/                 # Frontend Next.js application
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities and API client
│   ├── package.json
│   └── tsconfig.json
├── server/                # Backend Next.js API application
│   ├── src/
│   │   ├── app/api/      # API routes
│   │   └── lib/          # Server utilities
│   ├── package.json
│   └── tsconfig.json
└── prisma/                # Database schema and seed
    ├── schema.prisma
    └── seed.ts
```

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd Client
npm install

# Install backend dependencies
cd ../server
npm install

# Install Prisma CLI globally (if not already installed)
npm install -g prisma
```

### 2. Database Setup

```bash
# From project root
cd prisma

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with initial data
npx prisma db seed
```

### 3. Environment Variables

Create `.env.local` files in both `Client/` and `server/`:

**Client/.env.local:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/ikonex_academy"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

**server/.env.local:**
```
DATABASE_URL="postgresql://user:password@localhost:5432/ikonex_academy"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### 4. Run Development Servers

```bash
# Start frontend (port 3000)
cd Client
npm run dev

# Start backend (port 3001)
cd ../server
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend API will be available at `http://localhost:3001`

### 5. Default Login

- Email: `admin@ikonex.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - List all students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student details
- `PATCH /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Class Streams
- `GET /api/streams` - List all streams
- `POST /api/streams` - Create stream
- `GET /api/streams/:id` - Get stream details
- `PATCH /api/streams/:id` - Update stream
- `DELETE /api/streams/:id` - Delete stream

### Subjects
- `GET /api/subjects` - List all subjects
- `POST /api/subjects` - Create subject
- `GET /api/subjects/:id` - Get subject details
- `PATCH /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Exams
- `GET /api/exams` - List all exams
- `POST /api/exams` - Create exam

### Scores
- `POST /api/scores` - Bulk save scores

### Reports
- `GET /api/reports/student/:id?examId=xxx` - Generate student report card PDF
- `GET /api/reports/class/:streamId?examId=xxx` - Generate class report PDF

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The system uses the following main entities:
- User (Admin/Teacher accounts)
- ClassStream (Form 1A, Form 1B, etc.)
- Student (Student records)
- Subject (Mathematics, English, etc.)
- StreamSubject (Many-to-many relationship)
- Exam (CAT, Midterm, End Term)
- Score (Student scores per subject per exam)
- GradingScale (A, B, C, D, E grades)
- AuditLog (System audit trail)

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy

### Backend (Railway/VPS)
1. Deploy PostgreSQL database
2. Set environment variables
3. Deploy Next.js API server

### Database Migrations
Run migrations on production:
```bash
npx prisma migrate deploy
```

## Assessment Requirements Met

- Class Stream Management
- Student Management (CRUD, search, view by stream)
- Subject Management (CRUD, assign to streams)
- Student Assessment and Scoring (bulk entry, validation, duplicate prevention)
- Results Processing (total, average, grades, positions, ranking)
- Reporting (individual PDF report cards, class performance PDFs)
- Authentication and Authorization
- Responsive UI with modern design
- Clean, maintainable codebase

## License

Proprietary - Built for Ikonex Academy Assessment
