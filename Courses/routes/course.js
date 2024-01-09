const express = require('express');
const Auth = require('../middlewares/Auth');
const { Course } = require('../models/Course')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            message: "Retrived",
            courses
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err.message
        })
    }
})
router.post('/add', async (req, res) => {
    try {
        const { course_name, course_price, course_provider, course_image } = req.body;
        const courseObj = {
            course_name,
            course_price,
            course_provider,
            course_image
        }
        const course = new Course(courseObj);
        await course.save();
        return res.status(200).json({
            message: "saved",
            course
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error",
            error: err.message
        })
    }
})
router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { course_name, course_price, course_provider, course_image } = req.body;
        await Course.findByIdAndUpdate(id, { course_name, course_price, course_provider, course_image });
        return res.status(200).json({
            message: "updated"
        })
    } catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
})
router.get('/:name', async (req, res) => {
    try {
        const name = req.params.course_name;
        const course = await Course.findOne(name);
        res.status(200).json({
            message: "Data fetched",
            course
        })
    } catch (err) {
        res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }
})
router.delete("/delete/:id",async(req,res)=>{
    try{
       await Course.findByIdAndDelete(req.params.id);
       return res.status(200).json({
         message:"Data deleted",
        
       })
    }catch(err){
        return res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    }
})
module.exports = router;