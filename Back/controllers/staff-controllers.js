const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const multer = require('multer');
const {sumip,frontip} = require('../config/Config.js')
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const {Staff , Post, Student,Like, Category , RSVP, Department, School} = require('../models/schema');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Images/Staff_Image');
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

  const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Images/Post_Image');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const post =()=>{
    return multer({
    storage: postStorage,
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
  }).single('image');}

module.exports = {
    async Register(req,res){
        const { fullname, email, password} = req.body;
        const picture = req.file ? req.file.path : null;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            const existingStaff = await Staff.findOne({ where: { email } });
            if (existingStaff) {
                if (req.file) {
                    fs.unlinkSync(picture);
                  }
                return res.status(400).json({ message: 'User with this Email already exist', success: false });
            }
            const staff = await Staff.create({
                fullname,
                email,
                picture,
                password:hashedPassword
            });
            res.status(200).json({ success: true });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to register staff' });
        }
    },

    async UpdateStaff(req, res) {
        try {
          const { fullname, staffId } = req.body;
          const picture = req.file ? req.file.path : null;
          const stuf = await Staff.findOne({ where: { staffId } });
      
          if (stuf) {
            if (stuf.picture) {
              const pictureString = stuf.picture.toString();
              if (fs.existsSync(pictureString)) {
                fs.unlinkSync(pictureString);
              }
            }
      
            await Staff.update(
              { fullname: fullname, picture: picture },
              { where: { staffId: staffId } }
            );
      
            return res
              .status(200)
              .json({ message: 'Profile update Successful', success: true });
          } else {
            return res.status(400).json({ message: 'Staff Not Found', success: false });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to update Staff' });
        }
    },

    async AddPost(req,res){
        try {
            const result = await Staff.findOne({ where: { staffId: req.body.staffId } });
            const existingPost = await Post.findOne({
            where:{
                content: req.body.content,
                eventLocation: req.body.eventLocation,
                staffId: req.body.staffId,
                categoryId: req.body.categoryId
               }
            });

            const image = req.file ? req.file.path : null;

            if (!existingPost) {
            function canBeSummarized(text) {
               var englishRegex = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
                var words = text.trim().split(/\s+/);
                return englishRegex.test(text) && words.length >= 150;
            }
            
            let summarizable= canBeSummarized(req.body.content);
            

            const post = await Post.create({
                  content: req.body.content,
                  eventLocation: req.body.eventLocation,
                  staffId: req.body.staffId,
                  categoryId: req.body.categoryId,
                  title:req.body.title,
                  staffName: result.fullname,
                  summarizable,
                  image 
                });

                summarizer();
              
                if(req.body.rsvp){
                    const result = await Category.findOne({ where: { categoryId: req.body.categoryId } });
                    if (!result) { 
                        console.log('Invalid category ID'); 
                    return; 
                    }
                    const category = result.name.toUpperCase();  
                    const postId = post.postId;
                    
                    if (category === 'ALL') {
                        const staffs = await Staff.findAll();
                        const staffIds = staffs.map((staff) => staff.staffId);
                        const students = await Student.findAll();
                        const studentIds = students.map((student) => student.studentId);

                    
                        const staffEnteries = staffIds.map(forUser => { 
                            return {
                                postId: postId,
                                forUser: forUser,
                                userType: 'Staff',
                                status: false
                            }
                        });
                        const rsvpStaff = await RSVP.bulkCreate(staffEnteries);

                        const StudEnteries = studentIds.map(forUser => { 
                            return {
                                postId: postId,
                                forUser: forUser,
                                userType: 'Student',
                                status: false
                            }
                        });
                        const rsvpStud = await RSVP.bulkCreate(StudEnteries);
                        
                    } 
                    else if (category === 'STAFF') {
                        const staffs = await Staff.findAll();
                        const staffIds = staffs.map((staff) => staff.staffId);

                        const staffEnteries = staffIds.map(forUser => { 
                            return {
                                postId: postId,
                                forUser: forUser,
                                userType: 'Staff',
                                status: false
                            }
                        });
                        const rsvpStaff = await RSVP.bulkCreate(staffEnteries);

                    } 
                    else if (category === 'STUDENT') {
                        const students = await Student.findAll();
                        const studentIds = students.map((student) => student.studentId);

                        const StudEnteries = studentIds.map(forUser => { 
                            return {
                                postId: postId,
                                forUser: forUser,
                                userType: 'Student',
                                status: false
                            }
                        });
                        const rsvpStud = await RSVP.bulkCreate(StudEnteries);

                    }
                    else{
                        const result = await Department.findOne({where:{ShortedName: category }});
                        if(result === null){
                            const result = await School.findOne({where:{ShortedName: category }});

                            if (result === null){
                                console.log('category is not on both school and department so do nothing!!')
                            }
                            else{
                                const finalresult = await Department.findAll({where:{schoolId: result.schoolId }});

                                const stud = finalresult.map((dep)=>dep.depId);

                                const studentList = await Student.findAll({ where: { depId: { [Op.in]: stud } } });

                                const studentIds = studentList.map((student) => student.studentId);

                                const StudEnteries = studentIds.map(forUser => { 
                                    return {
                                        postId: postId,
                                        forUser: forUser,
                                        userType: 'Student',
                                        status: false
                                    }
                                });
                                const rsvpStud = await RSVP.bulkCreate(StudEnteries); 
                            }
                        } 
                        else {
                            const students = await Student.findAll({where:{depID:result.depId}});
                            const studentIds = students.map((student) => student.studentId);

                            const StudEnteries = studentIds.map(forUser => { 
                                return {
                                    postId: postId,
                                    forUser: forUser,
                                    userType: 'Student',
                                    status: false
                                }
                            });
                            const rsvpStud = await RSVP.bulkCreate(StudEnteries);
                        }
                    }
                }
          

            return res.status(201).json({ success:true, post: post })
        }else{
            if (req.file) {
                fs.unlinkSync(image);
              }
            return res.status(400).json({ message: `Sorry You're entering Duplacted post!`, success: false });
        }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while creating the post' });
        }
    },

    async MyPost(req,res){
        try {
            const posts = await Post.findAll({where: { staffId:req.query.staffId } ,
                include: [
                  { model: Category, attributes: ['name'] },
                  { model: Staff, attributes: ['picture'] }
                ],order:[['postId','DESC']]
              });
              const likes = await Like.findAll({
                attributes: [
                  'postId',
                  [Sequelize.fn('GROUP_CONCAT', Sequelize.col('liked_by_type')), 'likedTypes'],
                  [Sequelize.fn('GROUP_CONCAT', Sequelize.col('liked_by_id')), 'likedIds']
                ],
                group: ['postId'],
                raw: true
              });
      
      
             const likesObj = likes.reduce((acc, like) => {
              const postId = like.postId.toString();
              const likedTypes = like.likedTypes.split(',');
              const likedIds = like.likedIds.split(',');
              const likesData = { studentLikes: [], staffLikes: [] };
        
              likedTypes.forEach((type, index) => {
                if (type === 'student') {
                  likesData.studentLikes.push(likedIds[index]);
                } else if (type === 'staff') {
                  likesData.staffLikes.push(likedIds[index]);
                }
              });
        
              acc[postId] = likesData;
              return acc;
            }, {});
              
            const mappedPosts = posts.map(post => {
              const postId = post.postId.toString();
              const likesData = likesObj[postId] || { studentLikes: [], staffLikes: [] };
              const likesCount = likesData.studentLikes.length + likesData.staffLikes.length;
              const { Category, Staff, ...rest } = post.toJSON();
              return {
                ...rest,
                categoryName: Category.name,
                staffImage: Staff.picture,
                likes: likesCount,
                studentIds: likesData.studentLikes,
                staffIds: likesData.staffLikes
              };
            });
              
      
            if (!posts) {
              return res.status(404).json({ message: 'Posts not found' });
            }
        
            return res.json(mappedPosts);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async UpdatePost(req,res){
        const {postId , content , title , eventLocation , categoryId, staffId } = req.body;
        const image = req.file ? req.file.path : null;
        
        const stud = await Post.findOne({ where: { postId: postId } });

        if (stud) {
            if(stud.staffId.toString()===staffId){
               if (stud.image) {
              const imagedone = stud.image.toString();
              if (fs.existsSync(imagedone)) {
                fs.unlinkSync(imagedone);
              }
            }
            await Post.update(
              {  content , title , eventLocation , categoryId, image },
              {  where: { postId: postId } }
            );
            return res .status(200).json({ message: 'Post update Successful', success: true }); 
            }
            else{
            return res.status(400).json({ message: "You're Eligable to Update this Post", success: false });
            }
          } 
        else {
            return res.status(400).json({ message: 'Post Not Found', success: false });
         }
    },

    async DeletePost(req,res){
        const postId= req.body.postId;
        try {
            const post = await Post.findOne({ where: { postId: postId } });
            const rsvpCount = await RSVP.destroy({ where: { postId: postId } });

            if (!post) {
            return res.status(404).json({ error: 'Post not found' });
            }
            await post.destroy();
            return res.status(204).json({success:true});

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to delete post' });
        }
    },

    upload,
    post,
}

let interval; 
async function summarizer() {
  const response = await axios.get('http://127.0.0.1:4000');
  if (response.status === 200) {

        let result = await Post.findAll({
            where: { summarizable: true },
            attributes: ['postId', 'summarizable', 'content'] 
        });
        const task = async () => {
            for (const post of result) {
            const summary = await sumip.post('/', { content: post.content })
            if(summary.data.status){

                await Post.update({ summarizable: summary.data.summerized }, { where: { postId: post.postId } });

                result = result.filter((p) => p.postId !== post.postId);
            }
            }
            if (result.length === 0) {
            clearInterval(interval);
            }
        };
        await task();
        interval = setInterval(task, 5000); 
  } else {
    console.error('Failed to retrieve status from the Node.js API');
  }
}

