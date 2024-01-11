import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import { Course } from './components/Course';
import { Login } from './components/login/Login';
import CourseForm from './components/courseForm/CourseForm';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { CartState } from './store/CartState';
import  Cart from './components/cart/Cart';
import { NavBar } from './components/navbar/navBar';
import { AuthState } from './store/AuthState';
import { ProtectRoute } from './components/login/ProtectRoute';
import CourseDeleteForm from './components/courseForm/DeleteCourse';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);

  const addCourseHandler = (course) => {
    const courseObj = {
      course_name: course.courseName,
      course_price: course.coursePrice,
      course_image: course.courseImage,
      course_provider: course.courseProvider
    }
    setCourses([...courses, courseObj]);
  }

  const deleteCourseHandler = async (courseName) => {
        setCourses((prevCourses) => prevCourses.filter((course) => course.course_name!== courseName));
  };

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  return (
    <div className="App">
      <CartState>
        <AuthState>
          <NavBar />
          <div className='mainDiv'>
            <Routes>
              <Route path="/" element={
                <>
                  {courses.map((course, index) =>
                    <Course key={index} name={course.course_name} image={course.course_image} price={course.course_price} provider={course.course_provider} />
                  )}</>
              } />
            </Routes>
          </div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectRoute />}>
              <Route path="/add" element={
                <><h1>Add NEW COURSE</h1>
                  <CourseForm onCourseAdded={addCourseHandler} /></>
              } />
              <Route path="/delete" element={
                <><h1>Delete COURSE</h1>
                  <CourseDeleteForm onCourseDelete={deleteCourseHandler} /></>
              } />
            </Route>
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </AuthState>
      </CartState>
    </div>
  );
}

export default App;
