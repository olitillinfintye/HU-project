const axios = require('axios');

const seedData = {
    student: [
        {
          fullname: "Aysanew Yonas Neway",
          email: "aysanew@gmail.com",
          password: "aysanew",
          picture: null,
          year: "5",
          depId: 1
        },
        {
          fullname: "Bereket Honelign Alene",
          email: "bereket@gmail.com",
          password: "bereket",
          picture: null,
          year: "5",
          depId: 1
        },
        {
          fullname: "Bekalu Jegnaw Mehari",
          email: "bekalu@gmail.com",
          password: "bekalu",
          picture: null,
          year: "5",
          depId: 2
        },
        {
          fullname: "Tamiru Belachew Hailemariyam",
          studentId: 4,
          email: "tamiru@gmail.com",
          password: "tamiru",
          picture: null,
          year: "5",
          depId: 2
        },
        {
          fullname: "Tinsae astunegnaw Ambaneh",
          email: "tinsae@gmail.com",
          password: "tinsae",
          picture: null,
          year: "5",
          depId: 3
        },
        {
          fullname: "Milkias Solomon Gebrasilassie",
          email: "milkias@gmail.com",
          password: "milkias",
          picture: null,
          year: "5",
          depId: 3
        },
        {
          fullname: "Habtamu Alebachew Debeb",
          email: "habtamu@gmail.com",
          password: "habtamu",
          picture: null,
          year: "5",
          depId: 4
        },
        {
          fullname: "Samuel Muliye Fite",
          email: "samuel@gmail.com",
          password: "samuel",
          picture: null,
          year: "5",
          depId: 4
        },
        {
          fullname: "Yeastualashet Belayneh Eridaw",
          email: "yeastualashet@gmail.com",
          password: "yeastualashet",
          picture: null,
          year: "5",
          depId: 5
        },
        {
          fullname: "Brook Fantaastun Gebremeskel",
          email: "brook@gmail.com",
          password: "brook",
          picture: null,
          year: "5",
          depId: 5
        },
        {
          fullname: "Fuad Mohammed Bedaso",
          email: "fuad@gmail.com",
          password: "fuad",
          picture: null,
          year: "5",
          depId: 6
        },
        {
          fullname: "Absra Girma Tenna",
          email: "absra@gmail.com",
          password: "absra",
          picture: null,
          year: "5",
          depId: 6
        },
        {
          fullname: "Mentesenot Kibebew Kebede",
          email: "mentesenot@gmail.com",
          password: "mentesenot",
          picture: null,
          year: "5",
          depId: 7
        },
        {
          fullname: "Ayantu Lemma Gizaw",
          email: "ayantu@gmail.com",
          password: "ayantu",
          picture: null,
          year: "5",
          depId: 7
        },
        {
          fullname: "Mekdem Alemu Gebre",
          email: "mekdem@gmail.com",
          password: "mekdem",
          picture: null,
          year: "5",
          depId: 8
        },
        {
          fullname: "Abdi Adem Abdela",
          email: "abdi@gmail.com",
          password: "abdi",
          picture: null,
          year: "5",
          depId: 8
        },
        {
          fullname: "Naila Abdelah Hassen",
          email: "naila@gmail.com",
          password: "naila",
          picture: null,
          year: "5",
          depId: 9
        },
        {
          fullname: "Etsubsira Dirsha Demam",
          email: "etsubsira@gmail.com",
          password: "etsubsira",
          picture: null,
          year: "5",
          depId: 9
        },
        {
            fullname: "Yared Abera Mengistu",
            email: "yared@gmail.com",
            password: "yared",
            picture: null,
            year: "5",
            depId: 6
          },
          {
            fullname: "Yafet Berhanu Garno",
            email: "yafet@gmail.com",
            password: "yafet",
            picture: null,
            year: "5",
            depId: 6
          } 
      ],

      staff: [
        {
            fullname: "Biruk Yonas Neway",
            email: "biruk@gmail.com",
            password: "biruk",
            picture: null
          },
          {
            fullname: "Ephrem Honelign Alene",
            email: "ephrem@gmail.com",
            password: "ephrem",
            picture: null
          },
          {
            fullname: "Abel Jegnaw Mehari",
            email: "abel@gmail.com",
            password: "abel",
            picture: null
          },
          {
            fullname: "Robel Belachew Hailemariyam",
            email: "robel@gmail.com",
            password: "robel",
            picture: null
          },
          {
            fullname: "Milkias Solomon Gebrasilassie",
            email: "milkias@gmail.com",
            password: "milkias",
            picture: null
          },
          {
            fullname: "Selam Alebachew Debeb",
            email: "selam@gmail.com",
            password: "selam",
            picture: null
          },
          {
            fullname: "Yonas Muliye Fite",
            email: "yonas@gmail.com",
            password: "yonas",
            picture: null
          },
          {
            fullname: "Henok Belayneh Eridaw",
            email: "henok@gmail.com",
            password: "henok",
            picture: null
          },
          {
            fullname: "Daniel Fantaastun Gebremeskel",
            email: "daniel@gmail.com",
            password: "daniel",
            picture: null
          },
          {
            fullname: "Nebiyu Mohammed Bedaso",
            email: "nebiyu@gmail.com",
            password: "nebiyu",
            picture: null
          }   
      ], 

      admin:[
        {
            fullname: "Nahom Girma Tenna",
            email: "nahom@gmail.com",
            password: "nahom",
            picture: null
          },
          {
            fullname: "Dawit Kibebew Kebede",
            email: "dawit@gmail.com",
            password: "dawit",
            picture: null
          } 
      ],

      school:[
        {
            name:"School of civil and architecture engineering"
        },
        {
            name:"School of Mechanical Chemical and Materials Engineering"
        },
        {
            name:"School of Electrical Engineering and Computing"
        },
        {
            name:"School of Applied Natural Science"
        },
        {
            name:"Division of Freshman Program"
        },
      ],

      department:[
        {
            name:"Accounting $ Finance",
            schoolId: 1
        },
        {
            name:"BUsiness Administration",
            schoolId: 1
        },
        {
            name:"Mechanical Engineering",
            schoolId: 2
        },
        {
            name:"Chemical Engineering",
            schoolId: 2
        },
        {
            name:"Materials Science Engineering",
            schoolId: 2
        },
        {
            name:"Computer Science and Engineering",
            schoolId: 3
        },
        {
            name:"Electronics and Communication Engineering",
            schoolId: 3
        },
        {
            name:"Electrical Power and Control Engineering",
            schoolId: 3
        },
        // {
        //     name:"Software mas Engineering ",
        //     schoolId: 3
        // },
        {
            name:"Freshman Division Program",
            schoolId: 5
        },
      ],

      category:[
        {
            name:"All"
        },
        {
            name:"Staff"
        },
        {
            name:"Student"
        }
    ],

    post : [
        {
          staffId: 1,
          categoryId: 1,
          staffName: "Biruk Yonas Neway",
          content: "Exciting news! We are launching a new product next week. Stay tuned for more updates.",
          image: "product-launch.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 2,
          categoryId: 1,
          staffName: "Ephrem Honelign Alene",
          content: "Join us this weekend for a charity event at the local community center. Let's make a difference together!",
          image: "charity-event.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 3,
          categoryId: 1,
          staffName: "Abel Jegnaw Mehari",
          content: "We are excited to announce our partnership with a leading tech company. This collaboration will bring new opportunities for growth and innovation.",
          image: "partnership.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 4,
          categoryId: 4,
          staffName: "Robel Belachew Hailemariyam",
          content: "Attention students! Don't forget to submit your applications for the upcoming internship program. This is a great opportunity to gain valuable work experience.",
          image: null,
          summarizable: false,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 5,
          categoryId: 4,
          staffName: "Milkias Solomon Gebrasilassie",
          content: "Let's celebrate World Environment Day by planting trees in our community. Join us this Saturday at the local park.",
          image: "tree-planting.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "Local Park"
        },
        {
          staffId: 6,
          categoryId: 4,
          staffName: "Selam Alebachew Debeb",
          content: "Exciting update! Our company has been nominated for the Best Employer of the Year award. We are proud of our team's dedication and hard work.",
          image: null,
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 7,
          categoryId: 5,
          staffName: "Yonas Muliye Fite",
          content: "Calling all talented artists! We are organizing an art competition with amazing prizes. Show us your creativity and passion.",
          image: "art-competition.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 8,
          categoryId: 6,
          staffName: "Henok Belayneh Eridaw",
          content: "Are you interested in learning new languages? Join our language exchange program where you can meet language entastusiasts and improve your skills.",
          image: null,
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 9,
          categoryId: 9,
          staffName: "Daniel Fantaastun Gebremeskel",
          content: "Save the date! Our annual conference will take place on November 15th. Get ready for inspiring talks and valuable networking opportunities.",
          image: "conference.jpg",
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        },
        {
          staffId: 10,
          categoryId: 10,
          staffName: "Nebiyu Mohammed Bedaso",
          content: "Attention graduates! We are organizing a career fair next month. Don't miss this chance to connect with top companies and explore job opportunities.",
          image: null,
          summarizable: false,
          rsvp:0,
          eventLocation: "astu Stadium"
        }
      ],
    }  

let vars = 1;
async function sendPostRequest(url, data) {
    try {
      const response = await axios.post(url, data);
      if(response){
        const dataObjectName = Object.keys(data)[0];
        console.log(`Request successful: ${dataObjectName},${vars}`);
        vars+=1;
      }
    } catch (error) {
      console.error(`Request failed: ${error.message}`);
    }
  }

  async function Order() {
    for (const category of seedData.category) {
      await sendPostRequest('http://localhost:3000/api/admin/addCategory', category,);
    }
    console.log(`done here category`);
    vars = 1;

    for (const school of seedData.school) {
      await sendPostRequest('http://localhost:3000/api/admin/addSchool', school);
    }
    console.log(`done here school`);
    vars = 1;

    for (const department of seedData.department) {
      await sendPostRequest('http://localhost:3000/api/admin/addDep', department);
    }
    console.log(`done here department`);
    vars = 1;

    for (const staff of seedData.staff) {
      await sendPostRequest('http://localhost:3000/api/staff/stReg', staff);
    }
    console.log(`done here staff`);
    vars = 1;

    for (const student of seedData.student) {
      await sendPostRequest('http://localhost:3000/api/student/register', student);
    }
    console.log(`done here student`);
    vars = 1;

    for (const post of seedData.post) {
      await sendPostRequest('http://localhost:3000/api/staff/post', post);
    }
    console.log(`done here post`);
    vars = 1;
  }

  Order();
  