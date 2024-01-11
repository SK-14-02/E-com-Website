import React, { useState } from 'react';
import './form.css';
import axios from 'axios';

export const CourseDeleteForm = ({ onCourseDelete }) => {
    const [courseName, setCourseName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const nameHandler = (event) => {
        setCourseName(event.target.value);
    };

    const deleteCourseHandler = async (event) => {
        event.preventDefault();

        if (!courseName.trim()) {
            setErrorMessage('Please enter a course name for deletion');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:4000/delete`, {
                data: { course_name: courseName }
            });
            console.log(response);

            if (response.status === 200) {
                onCourseDelete(courseName);
                setErrorMessage('Deleted');
            } else {
                console.error('Failed to delete course:', response.data.message);
                setErrorMessage('Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            setErrorMessage('Failed to delete course');
        }
    };

    return (
        <div className='form-container'>
            <h1>Delete Course</h1>
            <form onSubmit={deleteCourseHandler}>
                <div className='error'>{errorMessage}</div>
                <div className='form-input'>
                    <input type="text" placeholder='Course Name' value={courseName} onChange={nameHandler} />
                </div>
                <div className='clearfix'></div>
                <div className='form-input'>
                    <button type="submit" className="delete_course">Delete Course</button>
                </div>
            </form>
        </div>
    );
};

export default CourseDeleteForm;
