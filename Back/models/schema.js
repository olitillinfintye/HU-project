const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/dbConfig');


// modeling whole databse table names
const Student = connection.define('Student', {
    studentId: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    fullname : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true // optional, if you want to allow null values for picture attribute
    },
    year : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

const Staff = connection.define('Staff', {
    staffId: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    fullname : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

const Admin = connection.define('Admin', {
    adminId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull:false
    },
    fullname : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const Department = connection.define('Department', {
    depId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ShortedName: {
        type: DataTypes.STRING, 
        allowNull: false
    }
});

const School = connection.define('School', {
    schoolId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    ShortedName: {
        type: DataTypes.STRING, 
        allowNull: false
    }
  });

const Post = connection.define('Post', {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    summarizable: {
      type: DataTypes.TEXT,
      defaultValue: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: function () {
        return this.image !== null;
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: function () {
        return this.image !== null;
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: function () {
        return this.content !== null;
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    staffName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventLocation: {
      type: DataTypes.STRING
    }
  });
  
const Category = connection.define('Category', {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

const Option = connection.define('Option', {
    optionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    preferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

const Preference = connection.define('Preference', {
    preferenceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userType: {
      type: DataTypes.ENUM('Student', 'Staff'),
      allowNull: false
    }
  });
  
  

const Like = connection.define('Like',{
    likeId:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    //the type of person who liked this(student, staff)
    liked_by_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    //the id of the person who liked this
    liked_by_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Chat = connection.define('Chat', {
    chatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      creatorType: {
        type: DataTypes.ENUM('staff', 'student'),
        allowNull: false
      },
      categoryId: {
        type:DataTypes.INTEGER,
        allowNull:false
     },
      topic: {
        type: DataTypes.STRING,
        allowNull: false
      },
      restrictedMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
  });

const Conversation = connection.define('Conversation', {
    convid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senderType: {
        type: DataTypes.ENUM('Student', 'Staff'),
        allowNull: false
      }
  });

const RSVP = connection.define('RSVP', {
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userType:{
        type:DataTypes.STRING,
        allowNull:false
    }
      
  });

Option.belongsTo(Category, { foreignKey: 'categoryId' });

Preference.belongsTo(Student, { foreignKey: 'userId', constraints: false, scope: { userType: 'Student' } });
Student.hasMany(Preference, { foreignKey: 'userId', constraints: false, scope: { userType: 'Student' } });

Preference.belongsTo(Staff, { foreignKey: 'userId', constraints: false, scope: { userType: 'Staff' } });
Staff.hasMany(Preference, { foreignKey: 'userId', constraints: false, scope: { userType: 'Staff' } });

Preference.hasMany(Option, { foreignKey: 'preferenceId' });
Option.belongsTo(Preference, { foreignKey: 'preferenceId' });

//Association between Student and Department
Department.hasMany(Student,{foreignKey:'depId'});
Student.belongsTo(Department,{foreignKey:'depId'}); 

// Association between School and Department
School.hasMany(Department,{foreignKey:'schoolId'});
Department.belongsTo(School,{foreignKey:'schoolId'});  

// A post can belong to only one category
Post.belongsTo(Category, { foreignKey: 'categoryId', allowNull: false });
Category.hasMany(Post, { foreignKey: 'categoryId', allowNull: false });

// A chat belongs to a category
Chat.belongsTo(Category, { foreignKey: 'categoryId',allowNull: false  });
Category.hasMany(Chat, { foreignKey: 'categoryId',allowNull: false  });

Post.belongsTo(Staff, {foreignKey: 'staffId',allowNull: false });
Post.hasMany(Like,{foreignKey: 'postId'});
Like.belongsTo(Post,{foreignKey: 'postId'});
Like.belongsTo(Staff, { foreignKey: 'liked_by_id', constraints: false });
Like.belongsTo(Student, { foreignKey: 'liked_by_id', constraints: false });

Post.hasMany(RSVP,{ foreignKey: 'forUser', constraints:false});
RSVP.belongsTo(Post,{ foreignKey: 'forUser', constraints:false});

// A staff can create many chats
Staff.hasMany(Chat, { foreignKey: 'creatorId', constraints: false });
Chat.belongsTo(Staff, { foreignKey: 'creatorId', constraints: false });

// A student can create many chats
Student.hasMany(Chat, { foreignKey: 'creatorId', constraints: false });
Chat.belongsTo(Student, { foreignKey: 'creatorId', constraints: false });

// A chat can have many conversations
Chat.hasMany(Conversation, { foreignKey: 'chatId' });
Conversation.belongsTo(Chat, { foreignKey: 'chatId' });

// Set up the polymorphic association between Conversation and Student/Staff
Conversation.belongsTo(Student, { foreignKey: 'userId', constraints: false, as: 'student' });
Conversation.belongsTo(Staff, { foreignKey: 'userId', constraints: false, as: 'staff' });

Student.hasMany(Conversation, { foreignKey: 'userId', constraints: false, scope: { senderType: 'student' } });
Staff.hasMany(Conversation, { foreignKey: 'userId', constraints: false, scope: { senderType: 'staff' } });

module.exports.Student = Student;
module.exports.Staff = Staff;
module.exports.Option = Option;
module.exports.Preference = Preference;
module.exports.Admin = Admin;
module.exports.Department = Department;
module.exports.Post = Post;
module.exports.Like = Like;
module.exports.Category = Category;
module.exports.School = School;
module.exports.Chat = Chat;
module.exports.Conversation = Conversation;
module.exports.RSVP = RSVP;


// connection.sync({ alter: true });