const express = require('express');
const router = express.Router();

const StaffController = require('../controllers/staff-controllers')
const AdminController = require('../controllers/admin-controllers')
const StudentController = require('../controllers/student-controllers')
const Common = require('../controllers/common-contollers')

router.post('/stReg',StaffController.upload(),StaffController.Register)
router.put('/staffUpdate',StaffController.upload(),StaffController.UpdateStaff)

router.post('/post',StaffController.post(),StaffController.AddPost)
router.put('/updatePost',StaffController.post(),StaffController.UpdatePost)
router.delete('/deletePost',StaffController.DeletePost)
router.delete('/deleteChat',Common.DeleteChat)

router.post('/createOpt',Common.CreateOption)
router.get('/getOpt',Common.GetOption)
router.delete('/deleteOpt',Common.DeleteOption)

router.post('/likePost',Common.LikePost)
router.get('/seeLike',Common.seeLike)
router.get('/viewPost',AdminController.ViewPost)
router.get('/myPost',StaffController.MyPost)

router.get('/getDep',Common.getDep)
router.get('/getSchool',Common.getSchool)
router.get('/getCat',Common.getCategory)

router.get('/getRsvp',Common.getRsvp)
router.put('/putRsvp',Common.putRsvp)
router.get('/getMyRsvp',Common.getMyPostRsvp)

router.post('/chat',Common.Chat)
router.get('/getchat',Common.getChat)
router.get('/checkconv',Common.checkChat)

router.post('/conv',Common.Conv)
router.get('/getconv',Common.getConv)

router.post('/forgetPassword',StudentController.forgetPassword)
router.post('/changePassword',StudentController.changePassword)

router.get('/searchPost',Common.SearchPost) //for guest

router.get('/searchStaff',Common.SearchStaff)
router.get('/searchStudent',Common.SearchStudent)

module.exports = router;