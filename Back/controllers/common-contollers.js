const { Op, Sequelize, where } = require('sequelize');
const http = require('http');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const bcrypt = require('bcrypt');
const {Staff , Post, Student, Category,Chat,Admin, RSVP,Preference,Option, Conversation, Department, Like,  School} = require('../models/schema');
const { query } = require('express');

const{sign}= require('jsonwebtoken');
const jwt = require("jsonwebtoken");
const { Console } = require('console');

const verifyUser = (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  else{
    jwt.verify(token, 'verySecretValue', (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }else{
        req.user = decoded;
        next();
      }
    })
  }
};

async function myOption(req, res) {
  try {
    const get = await Preference.findOne({ where: { userId: req.query.userId, userType: req.query.userType } });
    if (get) {
      const result = await Option.findAll({ where: { preferenceId: get.preferenceId }, include: [Category] });
      const data = result.map(result => ({
        categoryId: result.categoryId,
        optionId: result.optionId,
        categoryName: result.Category.name
      }));

      return data;

    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
      async user(req, res) {
        try {
          await verifyUser(req, res, async () => {
            return res.json({ status: 'Success', user: req.user });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },

      async login(req, res) {
        try {
          const { email, password, loginAs } = req.body;
          
          let user = null;
          if (loginAs === 'student') {
            user = await Student.findOne({ where: { email } });
          } else if (loginAs === 'staff') {
            user = await Staff.findOne({ where: { email } });
          } else if (loginAs === 'admin') {
            user = await Admin.findOne({ where: { email } });
          } else {
            return res.status(400).json({ message: 'Invalid request' });
          }

          if (!user) {
            return res.status(401).json({ message: 'Invalid email or User Not Found' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            if(loginAs === 'student'){
              const { studentId, fullname, email, picture, year, depId } = user;
              const { ShortedName: ShortedName,name: depName} = await Department.findOne({ where: { depId: depId } });
              const done = await Preference.findOne({where:{userId:studentId,userType:loginAs}})
              let pref;
              if(done){
                const result= await Option.findAll({where:{preferenceId:done.preferenceId},include:[Category]})
                const data = result.map(result => ({
                  optionId: result.optionId,
                  YourPreference: result.Category.name
                    }
                  ));
                  pref=data;
              }else{pref=done}

            const accessToken = sign({ user: { studentId, fullname, email, picture, year, depId, depName,ShortedName,pref}}, "verySecretValue", { expiresIn: '1d' }); // Access token
            res.cookie('user', accessToken, { httpOnly: true });
            return res.status(200).json({ accessToken, user: { studentId, fullname, email, picture, year, depId, depName,ShortedName, pref } });
            }
            
            else if (loginAs === 'staff') {
              const { staffId, fullname, email, picture, isVerified } = user;
              const done = await Preference.findOne({where:{userId:staffId,userType:loginAs}})
              let pref;
              if(done){
                const result= await Option.findAll({where:{preferenceId:done.preferenceId},include:[Category]})
                const data = result.map(result => ({
                  optionId: result.optionId,
                  YourPreference: result.Category.name
                    }
                  ));
                  pref=data;
              }else{pref=done}
              const accessToken = sign({ user:{staffId, fullname, email, picture, isVerified,pref }}, "verySecretValue", { expiresIn: '1d' }); // Access token
              res.cookie('user', accessToken, { httpOnly: true });
              return res.status(200).json({ accessToken, user: { staffId, fullname, email, picture, isVerified,pref } });
            } 
            
            else if (loginAs === 'admin') {
              const { adminId, fullname, email, picture} = user;
              const accessToken = sign({ user}, "verySecretValue", { expiresIn: '1d' }); // Access token
              res.cookie('user', accessToken, { httpOnly: true });
              return res.status(200).json({ accessToken, user: { adminId, fullname, email, picture} });
            } else {
              return res.status(400).json({ message: 'Invalid request' });
            }
  
            
          }

          else {
            return res.status(401).json({ message: 'This is not a correct password' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },

      async getCurrent(req, res) {
        try {
          const { userId, userType } = req.query;
          
          let user = null;
          if (userType === 'Student') {
            user = await Student.findOne({ where: { studentId:userId } });
          } else if (userType === 'Staff') {
            user = await Staff.findOne({ where: { staffId:userId } });
          } 
          else {
            return res.status(400).json({ message: 'Invalid request' });
          }

          if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
          }

          if(userType){
            if(userType === 'Student'){
                const { studentId, fullname, email, picture, year, depId ,isVerified} = user;
                const { ShortedName: ShortedName,name: depName} = await Department.findOne({ where: { depId: depId } });
                const done = await Preference.findOne({where:{userId:studentId,userType:userType}})
                let pref;
                if(done){
                  const result= await Option.findAll({where:{preferenceId:done.preferenceId},include:[Category]})
                  const data = result.map(result => ({
                    optionId: result.optionId,
                    YourPreference: result.Category.name
                      }
                    ));
                    pref=data;
                }else{pref=done}

          
              return res.status(200).json({user: { studentId, fullname, email, picture,isVerified, year, depId, depName,ShortedName, pref } });
              }
            
            else if (userType === 'Staff') {
                const { staffId, fullname, email, picture, isVerified } = user;
                const done = await Preference.findOne({where:{userId:staffId,userType:userType}})
                let pref;
                if(done){
                  const result= await Option.findAll({where:{preferenceId:done.preferenceId},include:[Category]})
                  const data = result.map(result => ({
                    optionId: result.optionId,
                    YourPreference: result.Category.name
                      }
                    ));
                    pref=data;
                }else{pref=done}
                return res.status(200).json({user: { staffId, fullname, email, picture, isVerified,pref } });
              } 
            else {
              return res.status(400).json({ message: 'Invalid request from front' });
            }
          }
  
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },
    
      async logout(req, res) {
        try {
          res.clearCookie('user');
          return res.status(200).json({ message: 'Success' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },

    async ViewPost(req,res){
      try {
        
        const {depName,keyword} = req.query;
        const depCat = await Category.findOne({ where: { name: depName } });

        const form = await Department.findOne({ where: { ShortedName: depName } });
        const school = await School.findOne({ where: { schoolId: form.schoolId } });
        const schoolCat = await Category.findOne({ where: { name: school.ShortedName } });

        if (!depCat) {
          return res.status(404).json({ message: 'Category not found' });
        }

        const categoryIds = [];
        if (depCat) {
          categoryIds.push(depCat.categoryId);
        }
        if (schoolCat) {
          categoryIds.push(schoolCat.categoryId);
        }
        const posts = await Post.findAll({
          where: { categoryId: categoryIds,
            [Op.or]: [
              { title: { [Op.like]: `%${keyword}%` } },
              { content: { [Op.like]: `%${keyword}%` } },
              { staffName: { [Op.like]: `%${keyword}%` } },
              { eventLocation: { [Op.like]: `%${keyword}%` } }
              ]
          },
          include: [
            { model: Category, attributes: ['name'] },
            { model: Staff, attributes: ['picture'] }
          ],order:[['createdAt','DESC']]
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

    async CreateOption(req, res) {
      try {
        const { categoryId, userId, userType } = req.body;
    
        const preferences = await Preference.findAll({ where: { userId: userId, userType: userType } });
    
        if (preferences.length > 0) {
          const preferenceId = preferences[0].preferenceId;
          const existing = await Option.findAll({
            where: {preferenceId:preferenceId}
          });

          const count = existing.length;
    
          if (userType === 'Student' && count >= 2) {
            return res.status(404).json({ success: false, message: "Student can't have more than two preferences" });
          } 
          else if (userType === 'Student' && count < 2) {
            const existingOption = await Option.findOne({
              where: { preferenceId: preferenceId, categoryId: categoryId }
            });
    
            if (existingOption) {
              return res.status(400).json({ success: false, message: "Option already created!" });
            } else {
              const createdOption = await Option.create({
                preferenceId: preferenceId,
                categoryId: categoryId,
              });
    
              return res.status(200).json({ success: true, message: "Option successfully created" });
            }
          } else if (userType === 'Staff') {
            const existingOption = await Option.findOne({
              where: { preferenceId: preferenceId, categoryId: categoryId }
            });
    
            if (existingOption) {
              return res.status(400).json({ success: false, message: "Option already created!" });
            } else {
              const createdOption = await Option.create({
                preferenceId: preferenceId,
                categoryId: categoryId,
              });
    
              return res.status(200).json({ success: true, message: "Option successfully created" });
            }
          } else {
            return res.status(404).json({ success: false, message: "User type is not eligible" });
          }
        } else {
          const createdPreference = await Preference.create({
            userId: userId,
            userType: userType
          });
    
          if (createdPreference) {
            const createdOption = await Option.create({
              preferenceId: createdPreference.preferenceId,
              categoryId: categoryId,
            });
    
            return res.status(200).json({ success: true, message: "Option successfully created" });
          }
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async GetOption(req,res){
      try {
        const get = await Preference.findOne({where:{userId:req.query.userId, userType:req.query.userType}});
        if(get){
          const result = await Option.findAll({where:{preferenceId:get.preferenceId},include: [Category]})
          const data = result.map(result => ({
            categoryId:result.categoryId,
            optionId: result.optionId,
            categoryName: result.Category.name
              }
            ));

          return res.status(200).json({ success: true, data });

        }else{
          return res.status(400).json({ success: false, message: "No preference is Set for You!!" });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async DeleteOption(req,res){
      try {
        const {optionId,userId,userType} = req.query;

        let result =await Preference.findOne({where:{userId:userId,userType:userType}});
        if(result){
          let go = await Option.count({where:{preferenceId:result.preferenceId}})
          let demo = await Option.findOne({where:{optionId:optionId}})

          if(go===1 && demo){
           let opt = await Option.destroy({where:{optionId:optionId}})
           let pre = await Preference.destroy({where:{preferenceId:result.preferenceId}})
           if(opt && pre){
            return res.status(200).json({ success: true, message: "Successfully deleted!!" });
           }
          }else if(demo){
            let opt = await Option.destroy({where:{optionId:optionId}})
            if(opt){return res.status(200).json({ success: true, message: "Successfully deleted!!" });}
          }else{
            return res.status(400).json({ success: false, message: "There is No such Option" });
        }
        }else{
          return res.status(400).json({ success: false, message: "There is No option deleted!!" });
        }

      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    },

    async SearchPost(req,res){
        const keyword = req.query.keyword;
        try {
          
          const depCat = await Category.findOne({ where: { name: 'ALL' } });
          const categoryIds = [];
           if (depCat) {
                 categoryIds.push(depCat.categoryId);
           }
            const posts = await Post.findAll({
            where: {categoryId: categoryIds,
                [Op.or]: [
                { title: { [Op.like]: `%${keyword}%` } },
                { content: { [Op.like]: `%${keyword}%` } },
                { staffName: { [Op.like]: `%${keyword}%` } },
                { eventLocation: { [Op.like]: `%${keyword}%` } }
                ]
            },
            include: [
              { model: Category, attributes: ['name'] },
              { model: Staff, attributes: ['picture'] }
            ],order:[['postId','DESC']]
            });

            const likes = await Like.findAll({
              attributes: [
                'postId',
                [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'likes']
              ],
              group: ['postId'],
              raw: true
             });
    
             const likesObj = likes.reduce((acc, like) => {
              const postId = like.postId.toString(); // Convert postId to string for comparison
              const likesCount = like.likes;
              acc[postId] = likesCount;
              return acc;
            }, {});
            
            const mappedPosts = posts.map(post => {
              const postId = post.postId.toString(); // Convert postId to string for comparison
              const likesCount = likesObj[postId] || 0;
              const { Category, Staff, ...rest } = post.toJSON();
            
              return {
                ...rest,
                categoryName: Category.name,
                staffImage: Staff.picture,
                likes: likesCount
              };
            });
            
            if (!posts) {
              return res.status(404).json({ message: 'Posts not found' });
            }
            return res.json(mappedPosts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async SearchStaff(req,res){
        const keyword = req.query.keyword;
        try {
            const staff = await Staff.findAll({
              attributes: [ 'staffId',
              'fullname', 'email',
              'picture',
              'isVerified',
            ],
            where: {
                [Op.or]: [
                { fullname: { [Op.like]: `%${keyword}%` } }
                ]
            }
            });
            
            res.json(staff);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async SearchStudent(req,res){
        const keyword = req.query.keyword;
        try {
            const student = await Student.findAll({
              attributes: [ 'studentId',
                'fullname', 'email',
                'picture',
                'year',
                'isVerified',
                'depId'
              ],
            where: {
                [Op.or]: [
                { fullname: { [Op.like]: `%${keyword}%` } },
                { '$Department.name$': { [Op.like]: `%${keyword}%` } } ,
                {
                  '$Department.School.name$': { [Op.like]: `%${keyword}%` },
                  '$Department.schoolId$': { [Op.col]: 'Student.depId' }
                },
                {'$Department.School.ShortedName$': { [Op.like]: `%${keyword}%` }}
                ]
            },
            include: [{
              model: Department,
              required: true ,
              attributes: [
                'name',
                'depId'
              ],
              include: [{
                model: School,
                required: true,
                attributes: [
                  'name',
                  'schoolId'
                ],
              }]
            }]
            });
            
            res.json(student);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async LikePost(req,res){
        try {
            const check = await Like.findOne({
                where: { 
                  liked_by_type: req.body.liked_by_type,
                  liked_by_id: req.body.liked_by_id,
                  postId: req.body.postId
                }
              });

            if (check) {
                await Like.destroy({where: {likeId: check.likeId}});
                const likes = await Like.findAll({
                    where:{postId:req.body.postId},
                    attributes: ['postId', [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'likes']],
                    group: ['postId']
                });
                
                res.status(200).json({likes});
            } else {
                const result = await Like.create(req.body);
                const likes = await Like.findAll({
                    where:{postId:req.body.postId},
                    attributes: ['postId', [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'likes']],
                    group: ['postId']
                });
                res.status(200).json(likes);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async seeLike(req,res){
        try {
            const likes = await Like.findAll({
                attributes: ['postId', [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'likes']],
                group: ['postId']
            });
            res.status(200).json(likes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async Chat(req,res){
      try {
          const check = await Chat.findOne({where:{
              topic: req.body.topic,
              categoryId: req.body.categoryId,
              creatorType: req.body.creatorType,
              creatorId: req.body.creatorId,
          }})
          if(check){
              res.status(500).json({message:'Chat The same type created', success:false})
          }else{
             const result = await Chat.create(req.body) 
             res.status(201).json({success:true});
          }
      }catch (err){
          console.log(err);
          res.status(500).json({message: 'server error'})
      }
    },

    myOption,
    async getChat(req, res){
        try {
          const { userType, userId } = req.query; 
          let chats = await Chat.findAll();

          if (chats) { // Replace "true" with your actual condition
            chats = await Promise.all(chats.map(async (chat) => {
              const category = await Category.findByPk(chat.categoryId);
              return {
                ...chat.toJSON(),
                for: category ? category.name : null,
              };
            }));
          }

          if (true) {
            chats = chats.filter(chat => {
              if (chat.creatorType === userType || !chat.restrictedMode) {
                return true; }
              return false; 
            });
          }

          let data= chats
          if(userType && !userId){
            res.status(200).json(data);
          }

          if (userType && userId) {
            const options = await myOption(req, res);
            
            data = data.filter(chat => options.some(option => option.categoryId === chat.categoryId));
          res.status(200).json(data);
        }
        } catch (err){
          console.log(err);
          res.status(500).json({message: 'server error'});
        }
    },

    async checkChat(req,res){
        try {
            const { userType , chatId } = req.query; 
            let check = await Chat.findOne({where:{chatId:chatId}});  
            if (check.creatorType === userType || !check.restrictedMode) {
                res.json({success:true}) 
            }else{
                res.json({success:false}) 
            }
        }catch (err){
            console.log(err);
            res.status(500).json({message: 'server error'})
        }
    },

    async DeleteChat(req,res){
      const { creatorId, chatId, creatorType } = req.body;

      try {
          const chat = await Chat.findOne({ where: { chatId: chatId } });
          
          const parsedCreatorId = parseInt(creatorId);

          if(chat && chat.creatorType===creatorType && chat.creatorId===parsedCreatorId){
             await chat.destroy();
             return res.status(204).json({success:true});
          }else{
            return res.status(404).json({success:false});
          }
      } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to delete post' });
      }
    },

    async Conv(req,res){
        try{
            let from ;
            if(req.body.senderType==='student'){
                let result = await Student.findOne({where:{studentId:req.body.userId}})
                from = result.fullname;
            }else{
                let result = await Staff.findOne({where:{staffId:req.body.userId}})
                from = result.fullname;
            }
            const result = await Conversation.create({
                message:req.body.message,
                userId:req.body.userId,
                senderType:req.body.senderType,
                chatId:req.body.chatId,
                from:from
            });
            if (result) {
                res.json({success:true}) 
            }else{
                res.json({success:false}) 
            }
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'server error'});
        }
    },

    async getConv(req, res) {
      try {
        const result = await Conversation.findAll({
          where: { chatId: req.query.chatId },
          attributes: ['from', 'message', 'userId', 'senderType'],
        });
    
        if (result) {
          const promises = result.map(async (result) => {
            let picture;
            if (result.senderType === 'Student') {
              const student = await Student.findOne({
                where: { studentId: result.userId },
                attributes: ['picture'],
              });
              picture = student ? student.picture : null;
            } else if (result.senderType === 'Staff') {
              const staff = await Staff.findOne({
                where: { staffId: result.userId },
                attributes: ['picture'],
              });
              picture = staff ? staff.picture : null;
            }
            return { ...result.toJSON(), picture };
          });
    
          const Results = await Promise.all(promises);

          res.json({success:true, Results});
        } else {
          res.json({ success: false });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      }
    },

    async getDep(req, res) {
      try {
        const departments = await Department.findAll({ attributes: ['depId', 'name', 'ShortedName', 'schoolId'] });
    
        const departmentData = [];
        for (const department of departments) {
          const category = await Category.findOne({ attributes: ['categoryId', 'name'], where: { name: department.ShortedName} });
          const departmentWithCategory = {
              ...department.toJSON(),
              categoryId: category.categoryId
            };
            departmentData.push(departmentWithCategory);
        }
    
        res.status(200).json(departmentData);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
      }
    },
    
    async getSchool(req,res){
      try{
          const result = await School.findAll({attributes:['schoolId','name','ShortedName']})
          // console.log(result)
          const schoolData = [];
          for (const school of result) {
          const category = await Category.findOne({ attributes: ['categoryId', 'name'], where: { name: school.ShortedName } });
          const schoolWithCategory = {
              ...school.toJSON(),
              categoryId: category.categoryId
            };
    
            schoolData.push(schoolWithCategory);
        }
    
        res.status(200).json(schoolData);
      }catch(err){
          console.log(err);
          res.status(500).json({message: 'server error'});
      }
  },

    async getCategory(req,res){
      try{
          const result = await Category.findAll({attributes:['categoryId','name']})
          res.status(200).json(result)
      }catch(err){
          console.log(err);
          res.status(500).json({message: 'server error'});
      }
  },

  async getRsvp(req, res) {
    try {
      const { userType, userId } = req.query;
  
      const rsvps = await RSVP.findAll({
        where: { status: false, userType: userType, forUser: userId },
        attributes: ['postId']
      });
  
      const rsvpData = [];

      let val=0;
  
      for (const rsvp of rsvps) {
        const postId = rsvp.postId;
  
        try {
          const post = await Post.findOne({
            attributes: ['title'],
            where: { postId: postId }
          });
  
          if (post) {
            const text = `You have received a notification for ${post.title}`;
            rsvpData.push({ ...rsvp.toJSON(), text });
          } else {
            val = val +1 ;
          }
        } catch (err) {
          console.log(`Error retrieving post for postId: ${postId}`, err);
        }
      }
  
      const totalRsvp = rsvps.length-val;
  
      res.status(200).json({ success: true, totalRsvp, rsvpData });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
  
  async putRsvp(req,res){
      try{
        const {rsvpData, userType, userId  } = req.body;

        console.log(rsvpData, userType, userId )

        for(const rsvp of rsvpData){
          if (rsvp.postId){
            const result = await RSVP.update({status:true},{where:{
            userType:userType, forUser:userId,postId:rsvp.postId
          }})
        }}
        res.status(200).json({success:true});
      }catch(err){
          console.log(err);
          res.status(500).json({message: 'server error'});
      }
  },

  async getMyPostRsvp(req,res){
      try{
        const {staffId} = req.query;
        const posts = await Post.findAll({where:{staffId:staffId}, attributes:['postId']})
        myRsvpData = [];
        if(posts){
          for(const post of posts){
            const total = await RSVP.count({
              where: { status: true, postId:post.postId}
            });
            myRsvpData.push({ postId: post.postId, total: total })
          }
        }

        res.status(200).json(myRsvpData);

      }catch(err){
          console.log(err);
          res.status(500).json({message: 'server error'});
      }
  },
}

