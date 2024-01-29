import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  // fetching token from auth state
  const {token} = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // jo bhi enrolled courses hai unka state variable bnaa lenge, ander saare enrolled courses ka data store krenge
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  //ab backend call krke enrolled courses ka data leke ayege
  const getEnrolledCourses = async() => {
    try {
      const response = await getUserEnrolledCourses(token);
      
      // ab jo bhi backend se response aaya hai usko enrolledCourses ke state variable me insert krr denge
      setEnrolledCourses(response);
    }
    catch(err) {
      console.log("Unable to fetch Enrolled Courses");
    }
  }
  
  useEffect(() => {
    // calling the function which get all courses enrolled by the user
    getEnrolledCourses();
  }, []);

  return (
    <>
        {/* Heading */}
        <div className="text-3xl text-richblack-50">
            Enrolled Courses
        </div>

        {/* applying map function on all the enrolled courses by the user */}
        {
          // agr enrolled courses ka data nahi aaya to it means call chl rhi hai to Loading dikha skte hai
          !enrolledCourses ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
              <div className="spinner">
              </div>
            </div>
          ) : !enrolledCourses.length ? (
            <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
              You have not enrolled in any Course yet
              {/* TODO: Modify this Empty State */}
            </p>
          ) : (
            <div className="my-8 text-richblack-5">
              <div className="flex rounded-t-lg bg-richblack-500">
                <p className="w-[45%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
              </div>
              
              {/* ab UI ke Cards create krenge */}
              {
                enrolledCourses.map((course, i, arr) => (
                  <div className={`flex items-center border border-richblack-700 ${
                    i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`} key={i}>
                    {/* left part, i.e., thumbnail, title and description */}
                    <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                      onClick={() => {
                        navigate(
                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                    }}>
                      {/* adding thumbnail */}
                      <img src={course.thumbnail} alt='course thumbnail' className="h-14 w-14 rounded-lg object-cover" />

                      {/* adding title and description of the course */}
                      <div className="flex max-w-xs flex-col gap-2">
                        <p className="font-semibold">{course.courseName}</p>
                        <p className="text-xs text-richblack-300">
                          {course.courseDescription.length > 50
                            ? `${course.courseDescription.slice(0, 50)}...`
                            : course.courseDescription}
                        </p>
                      </div>
                    </div>

                    {/* adding total course duration */}
                    <div className="w-1/4 px-2 py-3">
                      {course?.totalDuration}
                    </div>

                    {/* course ki progress bar wala part */}
                    <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                      <p>Progress: {course.progressPercentage || 0}%</p>

                      {/* ab progress bar ko show krne ke liye 3rd party library ka use krenge, i.e., ramonak */}
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        maxCompleted={100}
                        height='8px'
                        isLabelVisible={false}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
    </>
  ) 
}

export default EnrolledCourses
