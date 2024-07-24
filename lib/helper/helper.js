import bcryptjs from 'bcryptjs'
import User from '../models/User.model.js';
import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
config();

export const prisma = new PrismaClient();

let salt = 12;
export const encryptPassword = async (password) => {
    return await bcryptjs.hash(password, salt);
}
export const decryptPassword = async (password, user_password) => {
    return await bcryptjs.compare(password, user_password);
}


export const isEmailTaken = async (email) => {
    const user = await prisma.user.findFirst({
        where: { email: email },
    });
    console.log(user);
    return !!user; // Return true if user exists, false otherwise
};

export const isUserExist = async (email) => {
    const user = await prisma.user.findFirst({
        where: { email: email },
    });
    return !user; // Return false if user exists, true otherwise
};

export const isPhoneTaken = async (phone) => {
    const user = await prisma.user.findFirst({
        where: { phone: phone },
    });
    return !!user; // Return true if user exists, false otherwise
};
export const isCnicTaken = async (cnic) => {
    const user = await prisma.user.findFirst({
        where: { cnic: cnic },
    });
    return !!user;// Return true if user exists, false otherwise
};

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    starttls: {
        enable: true,
    },
    secureConnection: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    from: process.env.EMAIL_FROM,
});




// export const sendMailOtp = async (mail, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_FROM,
//         to: mail,
//         subject: "Email verification",
//         text: `<h1>Your email verification otp ${otp}</h1>`,
//     }; 
//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         } else {
//             return {
//                 success: true,
//                 message: "Check your email",
//             };
//         }
//     });
// }

const sendMailAsync = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Email verification",
        text: `<h1>Your email verification otp ${otp}</h1>`,
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject({
                    success: false,
                    message: err.message,
                });
            } else {
                resolve({
                    success: true,
                    message: "Check your email",
                });
            }
        });
    });
};

export const sendMailOtp = async (email, otp) => {
    try {
        const result = await sendMailAsync(email, otp);
        return result;
    } catch (error) {
        return error;
    }
};

export const userByEmail = async (email) => {
    const user = await prisma.user.findFirst({
        where: { email: email },
    });
    return user;
};


export const roundNumber = (number) => {
    return Math.round(number);
}

export const jwtSign = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

export const jwtVerify = (token) => {
    const verify_token = jwt.verify(
        token,
        process.env.JWT_SECRET,
    );
    return verify_token;
}
