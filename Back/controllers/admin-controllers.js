const { reverse } = require('lodash');
const { Op, Sequelize } = require('sequelize');
const multer = require("multer");
const path = require("path");
const { Department , Post , Staff, School,Student, Like, Category } = require('../models/schema');
const models = require('../models/schema')


module.exports = {
    async addSchool(req, res) {
        try {
            
            let abbreviation = '';
            if (req.body.name.includes(' ')) {
            const words = req.body.name.split(' ');
            abbreviation = words.reduce((abbr, word) => {
              if (['and'].includes(word.toLowerCase())) {
                return abbr;
              }
              return abbr + word[0].toUpperCase();
            }, '');
            }
            else { abbreviation = req.body.name.toUpperCase();}

            const existingSchool = await School.findOne({ where: { name: req.body.name } });

            if (!existingSchool) {
              const school = await School.create({
                name:req.body.name,
                ShortedName:abbreviation
              });
            }
            
            let category = await Category.findOne({ where: { name: abbreviation } });
            if (!category) {
              category = await Category.create({ name: abbreviation });
            }

            res.status(201).json({ success: true });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          }
    },

    async addDepartment(req, res) {
      try {
        let abbreviation = '';
        if (req.body.name.includes(' ')) {
          const words = req.body.name.split(' ');
          abbreviation = words.reduce((abbr, word) => {
            if (['of', 'and'].includes(word.toLowerCase())) {
              return abbr;
            }
            return abbr + word[0].toUpperCase();
          }, '');
        }
        else { abbreviation = req.body.name.toUpperCase();}

        const existingDepartment = await Department.findOne({ where: { name: req.body.name } });

        if (!existingDepartment) {
          const department = await Department.create({
            name: req.body.name,
            ShortedName: abbreviation,
            schoolId: req.body.schoolId
          });
        }
        let category = await Category.findOne({ where: { name: abbreviation } });
        if (!category) {
          category = await Category.create({ name: abbreviation});
        }

        res.status(201).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
    
    async addCategory(req, res) {
      try {
        let abbreviation = '';
        if (req.body.name.includes(' ')) {
          const words = req.body.name.split(' ');
          abbreviation = words.reduce((abbr, word) => {
            if (['of', 'and'].includes(word.toLowerCase())) {
              return abbr;
            }
            return abbr + word[0].toUpperCase();
          }, '');
        }
        else { abbreviation = req.body.name.toUpperCase();}

        let category = await Category.findOne({ where: { name: abbreviation } });
        if (!category) {
            category = await Category.create({name:abbreviation});
        }
        res.status(201).json({ success: true });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
    },

    async ApproveAccount(req,res){
        try {
            const staff = await Staff.findByPk(req.body.staffId);
            
            if (!staff) {
              return res.status(404).json({ success: false, message: "Staff not found" });
            }
            staff.isVerified = true;
            await staff.save();
            res.status(200).json({ success: true, message: "Staff account has been approved" });
            
          } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
          }
    },

  //   async ViewPost(req,res){
  //     try {
  //       const keyword = req.query.keyword;
  //       const posts = await Post.findAll({
  //         where: {
  //           [Op.or]: [
  //           { title: { [Op.like]: `%${keyword}%` } },
  //           { content: { [Op.like]: `%${keyword}%` } },
  //           { staffName: { [Op.like]: `%${keyword}%` } },
  //           { eventLocation: { [Op.like]: `%${keyword}%` } }
  //           ]
  //          },
  //         include: [
  //           { model: Category, attributes: ['name'] },
  //           { model: Staff, attributes: ['picture'] }
  //         ],order: [['postId', 'DESC']]
  //       });

  //       const likes = await Like.findAll({
  //         attributes: [
  //           'postId',
  //           [Sequelize.fn('COUNT', Sequelize.col('likeId')), 'likes']
  //         ],
  //         group: ['postId'],
  //         raw: true
  //        });

  //        const likesObj = likes.reduce((acc, like) => {
  //         const postId = like.postId.toString(); // Convert postId to string for comparison
  //         const likesCount = like.likes;
  //         acc[postId] = likesCount;
  //         return acc;
  //       }, {});
        
  //       const mappedPosts = posts.map(post => {
  //         const postId = post.postId.toString(); // Convert postId to string for comparison
  //         const likesCount = likesObj[postId] || 0;
  //         const { Category, Staff, ...rest } = post.toJSON();
        
  //         return {
  //           ...rest,
  //           categoryName: Category.name,
  //           staffImage: Staff.picture,
  //           likes: likesCount
  //         };
  //       });
        

  //       if (!posts) {
  //         return res.status(404).json({ message: 'Posts not found' });
  //       }
  //       return res.json(mappedPosts);
  //       } catch (err) {
  //         console.error(err);
  //         return res.status(500).json({ message: 'Internal Server Error' });
  //       }
  // },

  async ViewPost(req, res) {
    try {
      const keyword = req.query.keyword;
  
      const posts = await Post.findAll({
        where: {
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
        ],
        order: [['postId', 'DESC']]
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
  

    async GetStudent(req,res){
      try {
          const student = await Student.findAll();
          if (!student) {
            return res.status(404).json({ message: 'student not found' });
          }
          return res.json(student);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  },

    async GetStaff(req,res){
      try {
          const staff = await Staff.findAll();
          if (!staff) {
            return res.status(404).json({ message: 'staff not found' });
          }
          return res.json(staff);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  },
  
    async getAllData(req,res){
      try {
        const counts = {};
        const data = {};

        data.students = await models.Student.findAll({
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
          include: [{
            model: models.Department,
            attributes: ['name']
          }]
        });
        data.students = data.students.map((student) => {
          return {
            ...student.toJSON(),
            Department: student.Department.name
          };
        });
        
      
        data.staff = await models.Staff.findAll({
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        data.departments = await models.Department.findAll({
          include: [{
            model: models.School,
            attributes: ['name'],
            as: 'School' 
          }],
          attributes: ['depId', 'name', 'ShortedName','schoolId'], // Include only the specified attributes of the Department model
        });

        data.departments = data.departments.map((department) => ({
          ...department.toJSON(),
          School: department.School.name // Extract the school name from the associated School model
        }));
        
        data.posts = (await models.Post.findAll({
          include: [
            {
              model: models.Staff,
              attributes: ['fullname'],
              as: 'Staff'
            }
          ],
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          raw: true
        }))
        
        
        data.categories = await models.Category.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        data.schools = await models.School.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        

        counts.students = await models.Student.count();
        counts.staff = await models.Staff.count();
        counts.departments = await models.Department.count();
        counts.posts = await models.Post.count();
        counts.categories = await models.Category.count();
        counts.schools = await models.School.count();

      
    
        return res.status(200).json({ success: true, counts, data });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async BanAccount(req, res) {
      try {
        const staff = await Staff.findByPk(req.body.staffId);
        if (!staff) {
          return res.status(404).json({ success: false, message: "Staff account not found" });
        }
    
        if (!staff.isVerified) {
          return res.status(400).json({ success: false, message: "account is already banned or not approved" });
        }
    
        // Set isVerified to false to ban the account
        staff.isVerified = false;
        await staff.save();
    
        res.status(200).json({ success: true, message: "Staff account has been banned" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
      }
    }
    
}

// res.status(200).json({ success: true });