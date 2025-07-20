<p align="center">
  <img src="https://img.shields.io/badge/MERN-AttendXpert-brightgreen" alt="AttendXpert Badge">
  <img src="https://img.shields.io/badge/Status-Active-blue">
  <img src="https://img.shields.io/badge/License-MIT-yellow">
</p>

<h1 align="center">🎯 AttendXpert</h1>

<p align="center">
  Automated Facial & QR-Based Attendance Management System using MERN Stack & Microservices Architecture.
</p>

---

## 🚀 Why AttendXpert?

Traditional attendance systems are prone to:

❌ Proxy attendance  
❌ Manual errors  
❌ Time wastage during entry/exit

**AttendXpert solves these challenges by:**

✅ Using **Facial Recognition & QR codes** for secure, contactless attendance.  
✅ Maintaining **real-time logs and reports** for HR/admins.  
✅ Leveraging a **microservices architecture** for scalability, modularity, and maintainability.

---

## 🗂️ Project Overview

**AttendXpert** is a modular, scalable attendance management system designed to simplify tracking in educational institutions and workplaces.

✅ **Facial Verification:** Prevents proxy attendance using face-api.js.  
✅ **QR Code Scanning:** Backup attendance option for seamless entry/exit.  
✅ **Authentication & Authorization:** JWT-secured user management.  
✅ **Activity Logging:** Real-time logging and analytics for monitoring.  
✅ **Responsive Frontend:** User-friendly React interface for admins and users.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Bcrypt
- **Face Recognition:** face-api.js
- **QR Code Handling:** `qrcode`, `qrcode-reader`
- **Deployment:** Render, Vercel

---

## 🧩 Microservices Structure

📦 `AttendXpert/`  
├── `frontend/` – React dashboard and live camera capture  
├── `Attendance_Services/` – Attendance API services  
├── `Authentication_services/` – JWT authentication, registration  
├── `face_services/` – Facial recognition & matching  
├── `Qrcode_services/` – QR generation and scanning  
├── `logging_services/` – Logs for user activities  
└── `user_management_services/` – User CRUD and role management

This microservice structure enables **independent scalability, easier debugging, and clean CI/CD integration.**

---

## ✨ Key Features

✅ **Facial Recognition Attendance** using face-api.js.  
✅ **QR Code Attendance** for backup check-ins.  
✅ **Role-Based Access Control (RBAC)** for admin/user separation.  
✅ **Real-Time Logging & Reporting**.  
✅ **Microservices Architecture** for scalability and modularity.  
✅ **Responsive Frontend** for mobile and desktop use.

---

## 🚦 Installation & Running Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AttendXpert.git
cd AttendXpert
