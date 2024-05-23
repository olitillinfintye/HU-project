const express = require('express');
const router = express.Router();

const StaffController = require('../controllers/staff-controllers')
const AdminController = require('../controllers/admin-controllers')
const Common = require('../controllers/common-contollers');

router.get('/getAllData',AdminController.getAllData)

router.post('/login',Common.login)
router.get('/logout',Common.logout)
router.get('/user',Common.user)

router.get('/currentUser',Common.getCurrent)
router.get('/get',AdminController.GetStudent)
router.get('/getStaff',AdminController.GetStaff)

router.post('/addSchool',AdminController.addSchool)
router.post('/addDep',AdminController.addDepartment)
router.post('/addCategory',AdminController.addCategory)

router.get('/getDep',Common.getDep)
router.get('/getSchool',Common.getSchool)
router.get('/getCat',Common.getCategory) //

router.get('/ViewPost',AdminController.ViewPost)  // for admin only.

router.get('/searchPost',Common.SearchPost)
router.get('/searchStaff',Common.SearchStaff)
router.get('/searchStudent',Common.SearchStudent)  

router.delete('/deletePost',StaffController.DeletePost)
router.put('/approveAcc',AdminController.ApproveAccount)
router.put('/banAcc',AdminController.BanAccount) 

module.exports = router;