import React, { useState } from 'react';
import './form.css';
import axios from 'axios';

export const CourseForm = (props) => {

    const [formInput, setFormInput] = useState({
        courseName: '',
        coursePrice: '',
        courseImage: '',
        courseProvider: ''
    })

    const nameHandler = (event) => {
        setFormInput((prevState) => {
            return {
                ...prevState,
                courseName: event.target.value
            }
        })
    }
    const priceHandler = (event) => {
        setFormInput((prevState) => {
            return {
                ...prevState,
                coursePrice: event.target.value
            }
        })
    }
    const imageHandler = (event) => {
        setFormInput((prevState) => {
            return {
                ...prevState,
                courseImage: event.target.value
            }
        })
    }
    const providerHandler = (event) => {
        setFormInput((prevState) => {
            return {
                ...prevState,
                courseProvider: event.target.value
            }
        })
    }
    const [errorMessage, setErrorMessage] = useState('');
    const formSubmitHandler = (event) => {
        let valid = 1;
        if (formInput.courseName == '' && valid == 1) {
            setErrorMessage('No name found');
            valid = 0;

        }
        if (formInput.coursePrice == '' && valid == 1) {
            setErrorMessage('No price found');
            valid = 0;
        }

        if (valid == 1) {
            props.onCourseAdded(formInput);
        }
        saveCourseData(formInput);
        event.preventDefault();
    }
    const saveCourseData = async (formData) => {
        const course = {
            course_name: formData.courseName,
            course_image: formData.courseImage,
            course_price: formData.coursePrice,
            course_provider: formData.courseProvider
        }
        const message = await axios.post("http://localhost:4000/add", course, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return (
        <div className='form-container'>
            <h1>Fill Course Details</h1>
            <form onSubmit={formSubmitHandler}>
                <div className='error'>{errorMessage}</div>
                <div className='form-input'>
                    <input type="text" placeholder='Course Name' onChange={nameHandler} />
                </div>
                <div className='form-input'>
                    <input type="text" placeholder='Course Price' onChange={priceHandler} />
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <input type="text" placeholder='Course Image' onChange={imageHandler} />
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <input type="text" placeholder='Course Provider' onChange={providerHandler} />
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <button className="add_course">Add Course</button>
                </div>
                <div className='clearfix'></div>
            </form>
        </div>
    )
}

export default CourseForm;