const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/student-controllers')
const Common = require('../controllers/common-contollers')

router.post('/register',StudentController.upload(),StudentController.Register)

router.put('/studUpdate',StudentController.upload(),StudentController.UpdateStudent)

router.get('/verify',StudentController.VerifyStudent)

router.post('/likePost',Common.LikePost)
router.get('/seeLike',Common.seeLike)
router.get('/viewPost',Common.ViewPost)  //for student

router.get('/getDep',Common.getDep)
router.get('/getSchool',Common.getSchool)
router.get('/getCat',Common.getCategory)//

router.post('/createOpt',Common.CreateOption)
router.get('/getOpt',Common.GetOption)
router.delete('/deleteOpt',Common.DeleteOption)

router.post('/chat',Common.Chat)
router.get('/getchat',Common.getChat)
router.get('/checkchat',Common.checkChat)
router.delete('/deleteChat',Common.DeleteChat)

router.post('/conv',Common.Conv)
router.get('/getconv',Common.getConv)

router.get('/searchPost',Common.SearchPost)

router.post('/getVerification',StudentController.getVerification)
router.post('/forgetPassword',StudentController.forgetPassword)
router.post('/changePassword',StudentController.changePassword)

router.get('/getRsvp',Common.getRsvp)
router.put('/putRsvp',Common.putRsvp)

module.exports = router;