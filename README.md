# Ikonex Academy - Student Management System

A comprehensive web-based Student Management System built for Ikonex Academy assessment.

## Tech Stack

- **Framework**: Next.js 15 (App Router) - Full-stack application with built-in API routes
- **Language**: TypeScript
- **UI**: Tailwind CSS, Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with HttpOnly cookies
- **PDF Generation**: React PDF
- **Charts**: Recharts

## Features

### Core Assessment Requirements
- Class Stream Management (CRUD)
- Student Management (CRUD with search, view by stream)
- Subject Management (CRUD, assign to streams)
- Exam Management (CRUD)
- Bulk Score Entry with duplicate prevention
- Ranking Engine (subject and class positions)
- Grading Scale System (configurable)
- PDF Report Cards
- Class Performance Reports
- Dashboard with statistics

### Tier-System Enhancements (Production-Ready Features)
- Advanced Dashboard Analytics with charts (Recharts)
- QR Code Verification for report cards
- Student Photo Upload functionality
- Audit Logging System (track all user actions)
- System Settings Module (school configuration)
- Bulk Student CSV Import
- Excel/CSV Export functionality
- Dark Mode Toggle
- Student Profile Page with Performance Trends
- Teacher Remarks Auto-Generator
- Global Search (search across students, streams, subjects)

## Project Structure

```
student-management-system/
├── app/                   # Next.js full-stack application
│   ├── src/
│   │   ├── app/          # Next.js App Router (pages + API routes)
│   │   │   ├── api/      # API routes (auth, students, streams, etc.)
│   │   │   ├── (dashboard)/  # Dashboard pages
│   │   │   └── (auth)/  # Authentication pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities (auth, ranking, grading, pdf, etc.)
│   ├── package.json
│   └── tsconfig.json
└── prisma/                # Database schema and seed
    ├── schema.prisma
    └── seed.ts
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd app
npm install
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

Create `.env.local` in the `app/` directory:

```
DATABASE_URL="postgresql://user:password@localhost:5432/ikonex_academy"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

### 4. Run Development Server

```bash
cd app
npm run dev
```

The application will be available at `http://localhost:3000`

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
- `GET /api/reports/verify/:reportId` - Verify report authenticity via QR code

### Settings
- `GET /api/settings` - Get school settings
- `PATCH /api/settings` - Update school settings

### Audit Logs
- `GET /api/audit-logs` - View system audit trail

### Import/Export
- `POST /api/students/import` - Bulk import students from CSV
- `GET /api/export/students` - Export students to Excel

### Student Photos
- `POST /api/students/:id/photo` - Upload student photo

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

The system uses the following main entities:
- User (Admin/Teacher accounts)
- ClassStream (Form 1A, Form 1B, etc.)
- Student (Student records with photo support)
- Subject (Mathematics, English, etc.)
- StreamSubject (Many-to-many relationship)
- Exam (CAT, Midterm, End Term)
- Score (Student scores per subject per exam)
- GradingScale (A, B, C, D, E grades)
- AuditLog (System audit trail)
- SchoolSettings (School configuration)
- ReportVerification (QR code verification for reports)

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables (DATABASE_URL, JWT_SECRET)
3. Deploy
4. Run migrations on production: `npx prisma migrate deploy`

### Railway (Alternative)
1. Deploy PostgreSQL database on Railway
2. Deploy Next.js application on Railway
3. Set environment variables
4. Run migrations on production: `npx prisma migrate deploy`

## Assessment Requirements Met

### Core Functional Requirements
- Class Stream Management (Create, view all, view details)
- Student Management (Register, edit, delete, view single, view all, view by stream)
- Subject Management (Create, assign to streams, view all, edit/delete)
- Student Assessment and Scoring (Record scores, edit, view individual, view class, validate)
- Results Processing (Calculate total, average, grades, positions, ranking)
- Reporting (Generate PDF Report Cards, PDF class performance reports)

### Recommended Technologies Used
- Framework: Next.js 15 (App Router) - Full-stack with built-in API routes ✓
- Language: TypeScript ✓
- Database: PostgreSQL with Prisma ORM ✓
- Version Control: Git/GitHub ✓
- Deployment: Ready for Vercel or Railway (single unified deployment) ✓

### Additional Production-Ready Features
- JWT Authentication with HttpOnly cookies
- Role-based access control (Admin/Teacher)
- Audit logging for all system actions
- QR code verification for report authenticity
- Bulk CSV import for students
- Excel export functionality
- Dark mode support
- Advanced analytics dashboard
- Global search functionality
- Responsive design with Tailwind CSS and Shadcn UI

## License

Proprietary - Built for Ikonex Academy Assessment
