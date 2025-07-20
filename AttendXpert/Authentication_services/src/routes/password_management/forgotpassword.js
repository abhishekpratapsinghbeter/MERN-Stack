const express = require('express');
const router2 = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../../models/auth');
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const axios = require('axios'); 
var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure:"false",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS
    }
  });
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}






/************************************************************************************************************************************************************************************************************ 
  Route for changing password
*************************************************************************************************************************************************************************************************************/

router2.post('/change-password', async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    // Check if the passwords match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New password and confirm password do not match" });
    }

    try {
        let userID
        // Get the userID from the JWT token
        const token = req.header('Authorization');
        const authHeader = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: "Access denied, token missing" });
        }
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7); 
            // Verify the token
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ error: 'Invalid token' });
                } else {
                     userID = decoded.userID;
                }
            });
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await Auth.findOne({ user_ID:userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.user_password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect current password" });
        }
        const role = user.role;
        if (role === 'Student') {
            const studentId = user.userdetails;
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            recipientEmail = student.student_mail;
            recipientName = student.student_name;
        } else {
            const teacherId = user.userdetails;
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            recipientEmail = teacher.teacher_mail;
            recipientName = teacher.teacher_name;
        }
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.user_password = hashedNewPassword;
        await user.save();
        await axios.post('https://logging-services.onrender.com/log', { level: 'info', message: `User ${userID} Changed his password` });
        
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: recipientEmail, 
            subject: 'Attendance Portal :: Password Changed Successfully',
            text: `Dear ${recipientName}, your password has been changed successfully of the Attendance Portal.`
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                // If sending confirmation email fails, it will be logged, but it won't affect the password change process
            } else {
                console.log('Confirmation email sent: ' + info.response);
            }
        });
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});









/************************************************************************************************************************************************************************************************************************************************* 
       Route for forgotten password 
*************************************************************************************************************************************************************************************************************************************************************************************/

router2.post('/forgotten-password', async (req, res) => {
    const { userID } = req.body;
    try {
        const user = await Auth.findOne({ user_ID: userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        } else {
            const role = user.role;
            let recipientEmail, recipientName;
            if (role === 'Student') {
                const studentId = user.userdetails;
                const student = await Student.findById(studentId);
                if (!student) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                recipientEmail = student.student_mail;
                recipientName = student.student_name;
            } else {
                const teacherId = user.userdetails;
                const teacher = await Teacher.findById(teacherId);
                if (!teacher) {
                    return res.status(404).json({ error: 'Teacher not found' });
                }
                recipientEmail = teacher.teacher_mail;
                recipientName = teacher.teacher_name;
            }
            const OTP = generateOTP();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 
            user.otp = OTP;
            user.otpExpiry = otpExpiry;
            await user.save();

            const mailOptions = {
                from: process.env.SMTP_MAIL,
                to: recipientEmail,
                subject: 'Attendance Portal :: OTP for Password Reset',
                text: `Dear ${recipientName}, Your OTP for password reset for the attendance portal is: ${OTP}. OTP will expire in 5 minutes.`,
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Failed to send OTP" });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: 'OTP sent successfully' });
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});









/************************************************************************************************************************************************************************************************************************************************* 
       Route for verify otp 
*************************************************************************************************************************************************************************************************************************************************************************************/
router2.post('/verify-otp', async (req, res) => {
    const { userID, otp } = req.body; // Assuming you receive userID and otp in the request body
    try {
        const user = await Auth.findOne({ user_ID: userID });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the OTP matches the one stored in the database and is not expired
        if (user.otp !== otp || Date.now() > user.otpExpiry) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // OTP verification successful, prompt the user to enter the new password
        res.status(200).json({ message: "OTP verified successfully. Please enter your new password." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});









/************************************************************************************************************************************************************************************************************************************************* 
       Route for change forgotten  Password 
*************************************************************************************************************************************************************************************************************************************************************************************/

router2.post('/change-forgotten-password', async (req, res) => {
    const { userID, newPassword, confirmPassword } = req.body; 
    try {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "New password and confirm password do not match" });
        }

        // Increase timeout for findOne operation
        const user = await Auth.findOne({ user_ID: userID }).maxTimeMS(20000); // Increase timeout to 20,000 milliseconds (20 seconds)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let recipientEmail, recipientName;
        const role = user.role;

        if (role === 'Student') {
            const studentId = user.userdetails;
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            recipientEmail = student.student_mail;
            recipientName = student.student_name;
        } else {
            const teacherId = user.userdetails;
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            recipientEmail = teacher.teacher_mail;
            recipientName = teacher.teacher_name;
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.user_password = hashedNewPassword;
        user.otp = null; 
        user.otpExpiry= null;
        await user.save();
        await axios.post('https://logging-services.onrender.com/log', { level: 'info', message: `User ${userID} forgotten password changed` });
        
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: recipientEmail, 
            subject: 'Attendance Portal :: Password Changed Successfully',
            text: `Dear ${recipientName}, your password has been changed successfully of the Attendance Portal.`
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                // If sending confirmation email fails, it will be logged, but it won't affect the password change process
            } else {
                console.log('Confirmation email sent: ' + info.response);
            }
        });

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});




module.exports = router2;
