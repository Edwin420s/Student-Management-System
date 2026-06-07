# Ikonex Academy - Student Management System

A comprehensive, production-grade web-based Student Management System designed to automate core academic workflows for educational institutions. Built as a full-stack application demonstrating modern software engineering practices, clean architecture, and enterprise-grade features.

## Tech Stack

### Frontend
- **Framework**: Next.js 14.2.15 (App Router) - Full-stack React framework with server components
- **Language**: TypeScript 5.0.0 - Type-safe development
- **Styling**: Tailwind CSS 3.4.0 - Utility-first CSS framework with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Icons**: Lucide React - Beautiful, consistent icon library
- **Charts**: Recharts 2.10.0 - Data visualization and analytics
- **Theme**: next-themes - Dark mode support with system preference detection

### Backend
- **API**: Next.js API Routes - Serverless API endpoints
- **Authentication**: JWT (jsonwebtoken) with HttpOnly cookies for security
- **Password Hashing**: bcryptjs - Secure password storage
- **Validation**: Zod 3.22.0 - Schema validation and type inference

### Database
- **Database**: PostgreSQL - Relational database with ACID compliance
- **ORM**: Prisma 5.0.0 - Type-safe database client with migrations
- **Seeding**: Prisma seed script for initial data setup

### PDF & Reporting
- **PDF Generation**: @react-pdf/renderer 3.0.0 - Programmatic PDF creation
- **QR Codes**: qrcode 1.5.3 - Report verification system

### Data Import/Export
- **CSV Import**: PapaParse 5.4.1 - CSV parsing for bulk student import
- **Excel Export**: xlsx 0.18.5 - Excel file generation

### Form Handling
- **Forms**: react-hook-form 7.48.0 - Performant form library
- **Class Variance**: class-variance-authority - Component variant management

### Utilities
- **Date Handling**: Native JavaScript Date API
- **String Manipulation**: clsx, tailwind-merge - Conditional className utilities

## Features

### Core Assessment Requirements (100% Complete)
- **Class Stream Management**: Create, view, update, and delete class streams (e.g., Form 1A, Form 1B)
- **Student Management**: Full CRUD operations with search functionality, view by stream, photo upload support
- **Subject Management**: Create, assign to streams, view, edit, and delete subjects
- **Exam Management**: Create and manage examination periods (CAT, Midterm, End Term)
- **Student Assessment & Scoring**: Record examination and continuous assessment scores with duplicate prevention
- **Results Processing**: Automatic calculation of totals, averages, grades based on configurable scales
- **Ranking Engine**: Calculate subject positions and overall class positions with tie handling
- **PDF Reporting**: Generate individual student report cards and class performance reports
- **Data Validation**: Prevent duplicate score submissions through database constraints

### Production-Ready Enhancements
- **Advanced Dashboard Analytics**: Real-time statistics with Recharts visualizations
- **QR Code Verification**: Authenticity verification for PDF reports via QR codes
- **Student Photo Upload**: Support for student profile photos
- **Audit Logging System**: Complete audit trail tracking all user actions
- **School Settings Module**: Configurable school information (name, logo, principal, academic year)
- **Bulk CSV Import**: Import students from CSV files with validation
- **Excel Export**: Export student data to Excel format
- **Dark Mode**: Full dark mode support with system preference detection
- **Global Search**: Search across students, streams, and subjects from any page
- **Role-Based Access Control**: Admin and Teacher roles with appropriate permissions
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Teacher Remarks Auto-Generator**: Automatic performance remarks based on scores

## Project Structure

```
student-management-system/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication route group
│   │   │   └── login/           # Login page
│   │   ├── (dashboard)/         # Dashboard route group
│   │   │   ├── analytics/       # Analytics page
│   │   │   ├── exams/           # Exam management pages
│   │   │   ├── reports/         # Reports pages
│   │   │   ├── scores/          # Score entry pages
│   │   │   ├── settings/        # Settings pages
│   │   │   ├── streams/         # Class stream management
│   │   │   ├── students/        # Student management
│   │   │   │   ├── [id]/        # Individual student pages
│   │   │   │   ├── import/      # CSV import page
│   │   │   │   └── new/         # New student page
│   │   │   └── subjects/        # Subject management
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   │   ├── login/       # POST /api/auth/login
│   │   │   │   ├── logout/      # POST /api/auth/logout
│   │   │   │   ├── me/          # GET /api/auth/me
│   │   │   │   └── register/    # POST /api/auth/register
│   │   │   ├── audit-logs/      # GET /api/audit-logs
│   │   │   ├── dashboard/       # GET /api/dashboard/stats
│   │   │   ├── exams/           # GET/POST /api/exams
│   │   │   ├── export/          # GET /api/export/students
│   │   │   ├── reports/         # Report generation endpoints
│   │   │   │   ├── class/       # Class report PDF
│   │   │   │   ├── student/     # Student report card PDF
│   │   │   │   └── verify/      # QR code verification
│   │   │   ├── scores/          # POST /api/scores (bulk)
│   │   │   ├── settings/        # GET/PATCH /api/settings
│   │   │   ├── streams/         # GET/POST/PATCH/DELETE /api/streams
│   │   │   ├── students/        # Student CRUD + import
│   │   │   └── subjects/        # GET/POST/PATCH/DELETE /api/subjects
│   │   ├── globals.css          # Global styles with Tailwind
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Root page (redirects to login)
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── toast.tsx
│   │   ├── GlobalSearch.tsx     # Global search component
│   │   ├── Header.tsx           # Dashboard header
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── StudentForm.tsx      # Student creation/edit form
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   └── ThemeToggle.tsx      # Dark mode toggle
│   ├── lib/                     # Utility libraries
│   │   ├── pdf/                 # PDF generation
│   │   │   ├── ClassReportPDF.tsx
│   │   │   └── ReportCardPDF.tsx
│   │   ├── api.ts               # API client functions
│   │   ├── audit.ts             # Audit logging utilities
│   │   ├── auth.ts              # Authentication utilities
│   │   ├── grading.ts           # Grade calculation logic
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── qrcode.ts            # QR code generation
│   │   ├── ranking.ts           # Ranking calculation logic
│   │   ├── remarks.ts           # Auto-generated remarks
│   │   ├── utils.ts             # General utilities (cn function)
│   │   └── validations.ts       # Zod validation schemas
│   └── middleware.ts            # Next.js middleware for auth
├── prisma/                      # Database configuration
│   ├── migrations/              # Database migration files
│   ├── schema.prisma            # Prisma schema definition
│   └── seed.ts                  # Database seed script
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── DEPLOYMENT.md                # Deployment guide
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Database Schema

The system uses a well-designed relational database schema with proper normalization and constraints:

### Core Entities

**User**
- Authentication and authorization
- Role-based access (ADMIN, TEACHER)
- Email uniqueness constraint

**ClassStream**
- Class stream definitions (e.g., Form 1A, Form 1B)
- One-to-many relationship with students
- Many-to-many relationship with subjects

**Student**
- Student records with personal information
- Photo upload support
- Unique admission number
- Belongs to one class stream
- Has many scores across subjects and exams

**Subject**
- Subject definitions (e.g., Mathematics, English)
- Unique subject code
- Many-to-many relationship with class streams

**StreamSubject**
- Junction table for many-to-many relationship
- Unique constraint on (streamId, subjectId)
- Ensures no duplicate subject assignments

**Exam**
- Examination periods (CAT, MIDTERM, ENDTERM)
- Term and year tracking
- Associated with multiple scores

**Score**
- Student scores per subject per exam
- Unique constraint on (studentId, subjectId, examId) prevents duplicate entries
- Supports upsert operations for score updates

**GradingScale**
- Configurable grading scales (A, B, C, D, E)
- Min/max score ranges
- Associated remarks

**AuditLog**
- Complete audit trail of all system actions
- Tracks user, action, entity, and details
- JSON field for flexible detail storage

**SchoolSettings**
- School configuration (name, logo, principal)
- Academic year and term tracking
- Contact information

**ReportVerification**
- QR code verification for PDF reports
- Links students to exams with verification timestamps
- Prevents report tampering

### Key Database Features
- **Cascading Deletes**: Proper foreign key constraints with onDelete: Cascade
- **Unique Constraints**: Prevent duplicate data at database level
- **Indexes**: Optimized queries with proper indexing on foreign keys
- **JSON Support**: Flexible data storage in audit logs

## Authentication & Authorization

### JWT-Based Authentication
- Secure JWT tokens with 7-day expiration
- HttpOnly cookies prevent XSS attacks
- Secure flag in production
- SameSite lax policy for CSRF protection

### Role-Based Access Control
- **ADMIN**: Full access to all features including settings and audit logs
- **TEACHER**: Restricted access to student, stream, subject, and score management

### Middleware Protection
- Next.js middleware for route protection
- Automatic token verification on protected routes
- Redirect to login for unauthenticated users
- Redirect to dashboard for authenticated users on login page

## Results Processing Engine

### Grade Calculation
- Configurable grading scales via database
- Automatic grade assignment based on score ranges
- Remark generation based on performance

### Ranking Algorithm
- **Subject Ranking**: Standard competition ranking (1, 1, 3, 4 for ties)
- **Class Ranking**: Based on average scores across all subjects
- **Tie Handling**: Proper tie resolution in ranking calculations

### Score Validation
- Database-level unique constraint prevents duplicate scores
- Zod validation ensures score range (0-100)
- Transaction-based bulk score updates for consistency

## PDF Reporting System

### Individual Report Cards
- Student information and class details
- Subject-wise performance table
- Total marks and average calculation
- Grade and remark generation
- Class position display
- QR code for authenticity verification
- Professional A4 layout

### Class Performance Reports
- Class summary statistics
- Student ranking table
- Class mean calculation
- Top performer identification
- Exam details and term information

### QR Code Verification
- Unique report ID generation
- Scan to verify report authenticity
- Timestamp tracking
- Links to verification endpoint

## Setup Instructions

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database (local or cloud)
- Git for version control

### 1. Clone the Repository

```bash
git clone https://github.com/Edwin420s/Student-Management-System.git
cd Student-Management-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ikonex_academy"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
```

**Security Note**: Generate a secure JWT_SECRET using:
```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with initial data (admin user and grading scales)
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Default Login Credentials

- **Email**: `admin@ikonex.com`
- **Password**: `admin123`

**Important**: Change the default password after first login for security.

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@ikonex.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "Admin",
    "email": "admin@ikonex.com",
    "role": "ADMIN"
  }
}
```

#### POST /api/auth/logout
Logout user and clear authentication cookie.

#### GET /api/auth/me
Get current authenticated user information.

### Student Endpoints

#### GET /api/students
List all students with optional search and stream filtering.

**Query Parameters:**
- `search`: Search by name or admission number
- `streamId`: Filter by class stream

**Response:**
```json
[
  {
    "id": "student_id",
    "admissionNumber": "ADM001",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "MALE",
    "stream": {
      "id": "stream_id",
      "name": "Form 1A"
    }
  }
]
```

#### POST /api/students
Create a new student (Admin only).

**Request Body:**
```json
{
  "admissionNumber": "ADM001",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "MALE",
  "dob": "2010-01-01",
  "email": "john@example.com",
  "phone": "+254700000000",
  "streamId": "stream_id"
}
```

#### GET /api/students/:id
Get student details by ID.

#### PATCH /api/students/:id
Update student information (Admin only).

#### DELETE /api/students/:id
Delete student (Admin only).

#### POST /api/students/import
Bulk import students from CSV file (Admin only).

**Request:** Multipart form data with CSV file.

**CSV Format:**
```csv
admissionNumber,firstName,lastName,gender,dob,email,phone,streamId
ADM001,John,Doe,MALE,2010-01-01,john@example.com,+254700000000,stream_id
```

### Class Stream Endpoints

#### GET /api/streams
List all class streams with student counts.

**Response:**
```json
[
  {
    "id": "stream_id",
    "name": "Form 1A",
    "description": "Science stream",
    "_count": {
      "students": 25
    }
  }
]
```

#### POST /api/streams
Create a new class stream (Admin only).

#### GET /api/streams/:id
Get stream details with students.

#### PATCH /api/streams/:id
Update stream information (Admin only).

#### DELETE /api/streams/:id
Delete stream (Admin only).

### Subject Endpoints

#### GET /api/subjects
List all subjects. Filter by stream with `?streamId=xxx`.

#### POST /api/subjects
Create a new subject (Admin only).

**Request Body:**
```json
{
  "code": "MATH",
  "name": "Mathematics",
  "description": "Core mathematics subject",
  "streamIds": ["stream_id_1", "stream_id_2"]
}
```

#### GET /api/subjects/:id
Get subject details.

#### PATCH /api/subjects/:id
Update subject information (Admin only).

#### DELETE /api/subjects/:id
Delete subject (Admin only).

### Exam Endpoints

#### GET /api/exams
List all exams ordered by year.

**Response:**
```json
[
  {
    "id": "exam_id",
    "name": "End Term Exam",
    "term": "1",
    "year": 2024,
    "type": "ENDTERM"
  }
]
```

#### POST /api/exams
Create a new exam.

**Request Body:**
```json
{
  "name": "Midterm Exam",
  "term": "1",
  "year": 2024,
  "type": "MIDTERM"
}
```

#### DELETE /api/exams/:id
Delete exam.

### Score Endpoints

#### POST /api/scores
Bulk save or update student scores.

**Request Body:**
```json
{
  "entries": [
    {
      "studentId": "student_id",
      "subjectId": "subject_id",
      "examId": "exam_id",
      "score": 85
    }
  ]
}
```

**Features:**
- Upsert operation (creates or updates existing scores)
- Transaction-based for consistency
- Automatic audit logging
- Duplicate prevention via database constraint

### Report Endpoints

#### GET /api/reports/student/:id
Generate student report card PDF.

**Query Parameters:**
- `examId`: Filter by specific exam

**Response:** PDF file download

#### GET /api/reports/class/:streamId
Generate class performance report PDF.

**Query Parameters:**
- `examId`: Filter by specific exam

**Response:** PDF file download

#### GET /api/reports/verify/:reportId
Verify report authenticity via QR code.

**Response:**
```json
{
  "valid": true,
  "student": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "exam": {
    "name": "End Term Exam"
  },
  "verifiedAt": "2024-06-07T10:00:00Z"
}
```

### Settings Endpoints

#### GET /api/settings
Get school settings.

**Response:**
```json
{
  "schoolName": "Ikonex Academy",
  "principalName": "Dr. Smith",
  "academicYear": "2024",
  "currentTerm": "1",
  "address": "123 Education Street",
  "phone": "+254700000000",
  "email": "info@ikonex.com"
}
```

#### PATCH /api/settings
Update school settings (Admin only).

### Audit Log Endpoints

#### GET /api/audit-logs
View system audit trail (Admin only).

**Query Parameters:**
- `entity`: Filter by entity type (e.g., Student, Score)

**Response:**
```json
[
  {
    "id": "log_id",
    "userId": "user_id",
    "action": "BULK_SCORE_UPDATE",
    "entity": "Score",
    "entityId": "exam_id",
    "details": {
      "count": 25
    },
    "createdAt": "2024-06-07T10:00:00Z"
  }
]
```

### Dashboard Endpoints

#### GET /api/dashboard/stats
Get dashboard statistics.

**Response:**
```json
{
  "totalStudents": 150,
  "totalStreams": 6,
  "totalSubjects": 8,
  "averagePerformance": 72.5
}
```

### Export Endpoints

#### GET /api/export/students
Export students to Excel file.

**Response:** Excel file download

## Deployment

### Vercel Deployment (Recommended)

1. **Prepare for Deployment**
   ```bash
   # Build the project
   npm run build
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel project settings, add:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

5. **Run Migrations**
   After deployment, run migrations in production:
   ```bash
   npx prisma migrate deploy
   ```

### Netlify Deployment

1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework preset: Next.js

3. **Add Environment Variables**
   In Netlify site settings:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Deploy**
   - Click "Deploy site"

### Railway Deployment

1. **Deploy Database**
   - Create new project on Railway
   - Add PostgreSQL service
   - Copy DATABASE_URL

2. **Deploy Application**
   - Add new service from GitHub
   - Configure build and start commands:
     - Build: `npm run build`
     - Start: `npm start`

3. **Add Environment Variables**
   ```
   DATABASE_URL=your_railway_database_url
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=production
   ```

4. **Run Migrations**
   ```bash
   railway run npx prisma migrate deploy
   railway run npx prisma db seed
   ```

### Database Hosting Options

**Neon (Recommended for Vercel)**
- Serverless PostgreSQL
- Free tier available
- Excellent Vercel integration

**Supabase**
- PostgreSQL with additional features
- Free tier available
- Built-in authentication (optional)

**Railway PostgreSQL**
- Simple deployment
- Automatic backups
- Good for full-stack deployment

## Testing

### Manual Testing Checklist

**Authentication**
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Logout functionality
- [ ] Protected route access (redirect to login)
- [ ] Token expiration handling

**Student Management**
- [ ] Create new student
- [ ] Edit existing student
- [ ] Delete student
- [ ] Search students
- [ ] Filter by stream
- [ ] Import students from CSV
- [ ] Export students to Excel

**Class Stream Management**
- [ ] Create new stream
- [ ] Edit stream
- [ ] Delete stream
- [ ] View stream details with students

**Subject Management**
- [ ] Create new subject
- [ ] Assign subject to streams
- [ ] Edit subject
- [ ] Delete subject
- [ ] View subjects by stream

**Exam Management**
- [ ] Create new exam
- [ ] Delete exam
- [ ] View exam list

**Score Entry**
- [ ] Bulk score entry
- [ ] Score validation (0-100 range)
- [ ] Duplicate score prevention
- [ ] Score updates

**Results Processing**
- [ ] Total calculation
- [ ] Average calculation
- [ ] Grade assignment
- [ ] Subject ranking
- [ ] Class ranking
- [ ] Tie handling

**Reporting**
- [ ] Generate student report card PDF
- [ ] Generate class report PDF
- [ ] QR code verification
- [ ] Report accuracy

**Settings**
- [ ] Update school settings
- [ ] View school settings

**Audit Logs**
- [ ] View audit trail
- [ ] Filter by entity
- [ ] Verify action logging

## Assessment Requirements Compliance

### Functional Requirements (100% Complete)

 **Class Stream Management**
- Create class streams
- View all class streams
- View details of a single class stream

 **Student Management**
- Register students and assign to class stream
- Edit student information
- Delete student information
- View single student details
- View all students
- View students by specific class stream

 **Subject Management**
- Create and manage subjects
- Assign subjects to class streams
- View all subjects
- Edit and delete subject information

 **Student Assessment and Scoring**
- Record examination and continuous assessment scores
- Edit and update student scores
- View individual student performance by subject
- View class performance for selected subject
- Validate score entries and prevent duplicate submissions

 **Results Processing**
- Calculate total marks obtained by each student
- Calculate average scores per student
- Determine grades based on configurable grading scales
- Calculate subject positions and overall class positions
- Automatically rank students within class stream

 **Reporting**
- Generate individual PDF report cards
- Generate PDF class performance reports

### Recommended Technologies (100% Compliant)

 **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
 **Backend**: Node.js, Next.js API Routes
 **Database**: PostgreSQL with Prisma ORM
 **Version Control**: Git/GitHub
 **Deployment**: Ready for Vercel, Netlify, Railway

### Submission Requirements

 **Git Repository URL**: https://github.com/Edwin420s/Student-Management-System
 **Hosted Application URL**: https://studentmanagementsystem134.netlify.app
 **User Guide**: Comprehensive documentation in this README

## Design System

### Color Palette
The application uses a custom Material Design-inspired color system with light and dark mode support:

- **Primary**: Brand color for primary actions
- **Secondary**: Supporting color for secondary actions
- **Tertiary**: Accent color
- **Surface**: Background colors for different surface levels
- **Error**: Error states and destructive actions

### Typography
- **Font Family**: Inter (Google Fonts)
- **Display**: Large headings (36px)
- **Headline**: Section headings (24-28px)
- **Title**: Card titles (18px)
- **Body**: Body text (14-16px)
- **Label**: Labels and captions (12px)

### Spacing System
- Consistent spacing using Tailwind's spacing scale
- Custom spacing tokens for layout consistency
- Responsive margins and padding

### Components
All UI components follow the shadcn/ui pattern:
- Accessible by default
- Keyboard navigation support
- Screen reader friendly
- Dark mode compatible

## Security Best Practices

### Implemented Security Measures

1. **Password Security**
   - bcryptjs hashing with salt rounds of 10
   - Never store plain text passwords

2. **Authentication**
   - JWT tokens with expiration
   - HttpOnly cookies prevent XSS
   - Secure flag in production
   - SameSite lax policy

3. **Authorization**
   - Role-based access control
   - Middleware route protection
   - Server-side permission checks

4. **Input Validation**
   - Zod schema validation on all inputs
   - Database constraints for data integrity
   - SQL injection prevention via Prisma ORM

5. **Data Integrity**
   - Unique constraints prevent duplicates
   - Foreign key constraints maintain referential integrity
   - Transactions for atomic operations

6. **Audit Trail**
   - Complete logging of all user actions
   - Track user, action, entity, and timestamp
   - Admin-only access to audit logs

### Recommended Security Enhancements

1. **Rate Limiting**: Implement API rate limiting
2. **CSP Headers**: Add Content Security Policy headers
3. **HTTPS Enforcement**: Force HTTPS in production
4. **Password Complexity**: Enforce strong password requirements
5. **Session Management**: Implement session timeout
6. **Email Verification**: Verify user email addresses
7. **2FA**: Add two-factor authentication for admins

## Performance Optimization

### Implemented Optimizations

1. **Database Indexing**
   - Indexed foreign keys for faster joins
   - Indexed admission number for student lookup
   - Indexed unique constraints

2. **Prisma Client Singleton**
   - Single Prisma instance prevents connection pool exhaustion
   - Hot reloading support in development

3. **Next.js Optimization**
   - Server components for reduced JavaScript bundle
   - Automatic code splitting
   - Image optimization with next/image

4. **CSS Optimization**
   - Tailwind CSS purges unused styles
   - Minimal CSS bundle size

### Future Optimization Opportunities

1. **Caching**: Implement Redis for session and data caching
2. **CDN**: Use CDN for static assets
3. **Database Connection Pooling**: Optimize connection pool size
4. **Lazy Loading**: Implement lazy loading for heavy components
5. **Pagination**: Add pagination for large data sets

## Contributing

This project was built as an assessment submission. For contributions or questions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Proprietary - Built for Ikonex Academy Assessment

## Author

**Edwin Mwiti**
- Email: eduedwyn5@gmail.com
- Phone: +254 748 750 912
- LinkedIn: linkedin.com/in/edwinmwiti234
- GitHub: Edwin420s

## Acknowledgments

- Ikonex Systems for the assessment opportunity
- Next.js team for the excellent framework
- Prisma team for the amazing ORM
- Radix UI for accessible component primitives
- Vercel for deployment infrastructure

---

**Note**: This project demonstrates full-stack development skills including database design, API development, frontend engineering, authentication, authorization, PDF generation, and deployment. All assessment requirements have been met with additional production-ready features.
