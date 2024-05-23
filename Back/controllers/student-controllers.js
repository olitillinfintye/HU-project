const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { Student, Staff} = require('../models/schema');
const {USER,PASSWORD,JWT_SECRET,HOST,SMTP_HOST,SMTP_PORT} = require('../config/verify.js')

async function sendVerificationEmail(email) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: USER,
      pass: PASSWORD,
    },
  });
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1w' });
  const verificationLink = `${HOST}/api/student/verify?token=${token}`;

  const mailOptions = {
    from: USER,
    to: email,
    subject: 'Email Verification For astu Interactive Feed',
    html: `
      <p>Dear ${email}!</p>
      <p>Please verify your email address by clicking the following link:</p>
      <a href="${verificationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
    `,
  };
  

  await transporter.sendMail(mailOptions);
}

async function sendNewPasswordEmail(email,newpassword,fullname) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: USER,
      pass: PASSWORD,
    },
  });
  const mailOptions = {
    from: USER,
    to: email,
    subject: 'Your Password has been reseted !!',
    html: `
      <p>Dear ${fullname}!</p>
      <p>Your password has been reset. Use this password to login and change it later:</p>
      <p><strong><span style="font-weight: 800; color: red;">${newpassword}</span></strong></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/Stud_Image');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload =()=>{
  return multer({
  storage: storage,
  limits: { fileSize: '10000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files format to upload');
  },
}).single('picture');}

module.exports = {
  async Register(req, res) {
    try {
        const { fullname, email, password, year, depId } = req.body;
        const picture = req.file ? req.file.path : null; 
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
          if (req.file) {
            fs.unlinkSync(picture);
          }
          return res.status(400).json({ message: 'User with this Email already exists', success: false });
        }
        
        const student = await Student.create({
          fullname,
          email,
          picture,
          year,
          depId,
          password: hashedPassword,
        });
        if(student){sendVerificationEmail(student.email);}

        res.status(200).json({ success: true });
     
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to register Student' });
    }
  },

  async UpdateStudent(req, res) {
    try {
      const { fullname, year, studentId } = req.body;
      const picture = req.file ? req.file.path : null;
      const stud = await Student.findOne({ where: { studentId } });
  
      if (stud) {
        if (stud.picture) {
          const pictureString = stud.picture.toString();
          if (fs.existsSync(pictureString)) {
            fs.unlinkSync(pictureString);
          }
        }
  
        await Student.update(
          { fullname: fullname, year: year, picture: picture },
          { where: { studentId: studentId } }
        );
  
        return res
          .status(200)
          .json({ message: 'Profile update Successful', success: true });
      } else {
        return res.status(400).json({ message: 'Student Not Found', success: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update Student' });
    }
  },
  
  async VerifyStudent(req, res){
    try {
      const { token } = req.query;
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const { email } = decodedToken;

      const student = await Student.findOne({ where: { email } });
  
      if (!student) {
        return res.status(400).json({ message: 'Invalid verification token' });
      }
      if (student.isVerified) {
        res.status(200).json({ success: false });// Redirect to a page indicating that the email is already verified
      }
      student.isVerified = true;
      await student.save();
      res.status(200).json({ success: true });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to verify email' });
    }
  },

  async getVerification(req, res){
    try {
      const {email, userId , userType} = req.body;
      const result = await Student.findOne({where:{email:email}})
      if(userType==='Student'){
        if(!result.isVerified){
          sendVerificationEmail(result.email)
          res.status(200).json({ success: true, message:"Verfication mail has been successfully sent to your email acount!" });
        }else{
          res.status(400).json({ success: false, message:"You're Already Verfied!" });
        }
      }else{
        res.status(400).json({ success: false, message:"Only student can get this service!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to send verification' });
    }
  },

  async forgetPassword(req, res) {
    try {
      const { email, userType } = req.body;
  
      function newPassword() {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#';
        let password = '';
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password += characters[randomIndex];
        }
        return password;
      }
  
      if (userType === 'Staff') {
        const result = await Staff.findOne({ where: { email: email }, attributes: ['staffId', 'password', 'fullname'] });
        if(result){
          const newpassword = newPassword();
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
    
          const update = await Staff.update({ password: hashedPassword }, { where: { staffId: result.staffId } });
          if (update) {
            sendNewPasswordEmail(email, newpassword, result.fullname);
            return res.status(200).json({ success: true, message: "Check your email address. Your new password has been successfully sent!" });
          }
        }else{
          return res.status(400).json({ success: false, message: "No Account with this email address!" });
        }
      
      } else if (userType === 'Student') {
        const result = await Student.findOne({ where: { email: email }, attributes: ['studentId', 'password', 'fullname'] });
        if(result){
          const newpassword = newPassword();
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
    
          const update = await Student.update({ password: hashedPassword }, { where: { studentId: result.studentId } });
          if (update) {
            sendNewPasswordEmail(email, newpassword, result.fullname);
            return res.status(200).json({ success: true, message: "Check your email address. Your new password has been successfully sent!" });
          }
        }else{
          return res.status(400).json({ success: false, message: "No Account with this email address!" });
        }
      } else {
        return res.status(400).json({ success: false, message: "Only students and staff can use this service!" });
      }
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to forget password' });
    }
  },
  
  async changePassword(req, res){
    try {
      const {email,userType,oldPassword,newPassword} = req.body;

      if (userType === 'Staff') {
        const result = await Staff.findOne({ where: { email: email }, attributes: ['staffId', 'password'] });
        if(result){
          const passwordMatch = await bcrypt.compare(oldPassword, result.password);
          if(passwordMatch){
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const update = await Staff.update({ password: hashedPassword }, { where: { staffId: result.staffId } });
            if (update) {
              return res.status(200).json({ success: true, message: "Your new password has been successfully Changed!" });
            }
          }else{
            return res.status(400).json({ success: false, message: "please Provide Correct old Password!" });
          }
        }else{
          return res.status(400).json({ success: false, message: "No Staff Account with this email address!" });
        }
      
      } else if (userType === 'Student') {
        const result = await Student.findOne({ where: { email: email }, attributes: ['studentId', 'password' ] });
        if(result){
          const passwordMatch = await bcrypt.compare(oldPassword, result.password);
          if(passwordMatch){
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const update = await Student.update({ password: hashedPassword }, { where: { studentId: result.studentId } });
            if (update) {
              return res.status(200).json({ success: true, message: "Your new password has been successfully Changed!" });
            }
          }else{
            return res.status(400).json({ success: false, message: "please Provide Correct old Password!" });
          }
        }else{
          return res.status(400).json({ success: false, message: "No Student Account with this email address!" });
        }
      } else {
        return res.status(400).json({ success: false, message: "Only students and staff can use this service!" });
      }


      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to send verification' });
    }
  },

  upload,
};

