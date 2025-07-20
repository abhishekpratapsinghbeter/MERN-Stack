<p align="center">
  <img src="https://img.shields.io/badge/MERN-AttendXpert-brightgreen" alt="AttendXpert Badge">
  <img src="https://img.shields.io/badge/Status-Active-blue">
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

Here is your **clean, fully structured, properly formatted `README.md` section** for:

## 🚦 Installation & Running Locally
---

## 🚦 Installation & Running Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/abhishekpratapsinghbeter/AttendXpert.git
cd AttendXpert
```

---

### 2️⃣ Install Dependencies

Navigate into **each microservice folder** and the **frontend** to install dependencies:

```bash
cd Attendance_Services
npm install

cd ../Authentication_services
npm install

cd ../face_services
npm install

cd ../Qrcode_services
npm install

cd ../logging_services
npm install

cd ../user_management_services
npm install

cd ../frontend
npm install
```

---

### 3️⃣ Configure Environment Variables

In **each microservice folder**, create a `.env` file with the following:

```
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

⚠️ **Note:**

* Use a **unique `PORT`** for each microservice to avoid conflicts.
* Replace with your actual MongoDB URI and a secure JWT secret key.

---

### 4️⃣ Run the Application

For **each microservice and the frontend**, run:

```bash
npm start
```

The **frontend** will be accessible locally at:

[http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

✅ **Backend microservices:** Deploy on Render, Fly.io, or DigitalOcean.
✅ **Frontend:** Deploy on Vercel or Netlify.
✅ Set environment variables in your deployment dashboard as configured locally.

---

## 🤝 Contribution Guidelines

Contributions are welcome! 🚀

1️⃣ Fork the repository.
2️⃣ Create a feature branch:

```bash
git checkout -b feature/YourFeature
```

3️⃣ Commit your changes:

```bash
git commit -m "Add Your Feature"
```

4️⃣ Push to your branch:

```bash
git push origin feature/YourFeature
```

5️⃣ Open a Pull Request on GitHub.

---

## 📜 License

Distributed under the **MIT License**.

---

## 📩 Contact

For queries, support, or collaboration opportunities:

* 📧 **Email:** [abhishekpratapsingh1234@gmail.com](mailto:abhishekpratapsingh1234@gmail.com)
* 🔗 **LinkedIn:** [linkedin.com/in/abhishekpratapsingh](https://www.linkedin.com/in/abhishek-pratap-singh-88523a207/)

---

<h2 align="center">
  Made with ❤️ by <b>Abhishek Pratap Singh</b>
</h2>

---

