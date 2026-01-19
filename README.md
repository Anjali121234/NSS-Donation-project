# 🧾 NSS Donation Management System

A full-stack **Donation Management Web Application** built as part of an **NSS Development Project**, designed to manage users, donations, and admin insights with authentication and role-based access.

---

## 🚀 Features

### 👤 User Features
- User registration & login
- Secure authentication using NextAuth
- Make donations by entering amount
- View latest donation status
- View complete donation history
- Responsive user dashboard

### 🛠 Admin Features
- Admin authentication
- Admin dashboard with statistics
- View all users
- View all donations
- Role-based access control

---

## 💳 Payment Handling

⚠️ **No real payment gateway is used in this project.**

- Donations are handled using **mock / simulated logic**
- Donation status (`pending`, `success`, `failed`) is managed programmatically
- Suitable for academic and demo purposes

> The code structure allows easy future integration of real payment gateways.

---

## 🧱 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS

**Backend**
- Next.js API Routes
- NextAuth (Credentials Provider)
- JWT Sessions

**Database**
- MongoDB
- Mongoose

---

## 📁 Project Structure
.
├── app/
│   ├── api/
│   │   ├── auth/                # NextAuth configuration
│   │   ├── donation/            # Create donation (POST)
│   │   ├── user/
│   │   │   └── donations/       # User donation history
│   │   └── admin/
│   │       ├── stats/           # Dashboard stats
│   │       ├── users/           # All users
│   │       └── donations/       # All donations
│   │
│   ├── admin/                   # Admin pages
│   ├── user/                    # User pages
│   ├── login/
│   ├── register/
│   └── layout.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   └── Charts.tsx
│
├── lib/
│   ├── db.ts                    # MongoDB connection
│   ├── auth.ts                  # Role protection helpers
│   └── seedAdmin.ts             # Admin seeding logic
│
├── models/
│   ├── User.ts
│   └── Donation.ts
│
├── scripts/
│   └── seedAdmin.ts             # CLI admin creation script
│
├── .env.local
├── README.md
└── package.json

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone 
cd donation-system

Install dependencies
npm install

Create .env:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

###To create the admin user in a fresh database:
run:
npx tsx scripts/seedAdmin.ts

###Default Admin Credentials
 -**Email**: admin@example.com
 -**Password**: Admin@123


 ###Run the Project:
   npm run dev

###Open in browser:
http://localhost:3000

###Authentication
- NextAuth Credentials Provider
- JWT-based sessions
- Role-based route protection
- Separate admin & user dashboards

###🎯 Learning Outcomes

- Full-stack development with Next.js
- Authentication & authorization
- MongoDB schema design
- REST APIs
- Tailwind CSS responsiveness
- Clean project architecture



##👩‍💻 Author

Anjali
Undergraduate Student, IIT Roorkee
NSS Development Project