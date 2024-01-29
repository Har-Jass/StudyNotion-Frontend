import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourseForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED) {
        setValue('public', true);
    }
  }, []);

  const goToCourses = () => {
    dispatch(resetCourseState());

    // and navigate krdenge my-courses ke route pe
    // navigate("/dashboard/my-courses");
  }

  // this function handle the functionality when user submit the form
  const handleCoursePublish = async () => {
    // check if form has been updated or not
    // agr course already published hai and public checkbox ki value bhi true hai
    // and agr course draft ki stage me hai and public checkbox ki value false hai
    // uss case me API call nahi krenge,  user ko direct courses show krr denge
    if((course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) || (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)) {
        // no updation in form
        // if there is no updation in form, then no need to make API call
        // just show all courses to user and return
        goToCourses();
        return;
    }

    // ab form updated ke case ka logic write down krenge
    const formData = new FormData();

    // course ki Id ko form data me append krr denge
    formData.append("courseId", course._id);

    // course ka status find out krr lenge
    // agr public checkbox ki value true hai to course status published hai else course status draft hai
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    
    // status ko form data me append krr denge
    formData.append("status", courseStatus);

    setLoading(true);

    // calling API
    const result = await editCourseDetails(formData, token);

    // result ko check krr lenge, agr result valid hai to means course update ho chuka hai
    // and agr course edit ho chuka hai to goToCourses wale page pe land krr jayege
    if(result) {
        goToCourses();
    }

    setLoading(false);
  }

  // this function will call when the form will submit
  const onSubmit = () => {
    // whenever user submit the form, this function will call
    handleCoursePublish();
  }

  // this function will call when then user clicks "Back" button
  const goBack = () => {
    dispatch(setStep(2))
  }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
        {/* publish course ki heading */}
        <p>
            Publish Course
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
            {/* checkbox container */}
            <div>
                {/* creating label div */}
                <label htmlFor="public" className="inline-flex items-center text-lg">
                    {/* creating checkbox */}
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    />

                    {/* entering label text */}
                    <span className="ml-2 text-richblack-400">
                        Make this course as public
                    </span>
                </label>
            </div>

            {/* next prev button div */}
            <div className="ml-auto flex max-w-max items-center gap-x-4">
                {/* back button */}
                {/* disabled={loading} means, ke jb bhi loading ki value true ho tb user iss button ko click na krr paye and button click se koi action na ho */}
                <button
                    disabled={loading}
                    type="button"
                    onClick={ goBack }
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
                >
                    Back
                </button>

                {/* next, i.e., "Save Changes" button */}
                <IconBtn 
                    disabled={loading} 
                    text="Save Changes" 
                />
            </div>
        </form>
    </div>
  )
}

export default PublishCourseForm



// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
// import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../../utils/constants"
// import IconBtn from "../../../../common/IconBtn"

// export default function PublishCourse() {
//   const { register, handleSubmit, setValue, getValues } = useForm()

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (course?.status === COURSE_STATUS.PUBLISHED) {
//       setValue("public", true)
//     }
//   }, [])

//   const goBack = () => {
//     dispatch(setStep(2))
//   }

//   const goToCourses = () => {
//     dispatch(resetCourseState())
//     navigate("/dashboard/my-courses")
//   }

//   const handleCoursePublish = async () => {
//     // check if form has been updated or not
//     if (
//       (course?.status === COURSE_STATUS.PUBLISHED &&
//         getValues("public") === true) ||
//       (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
//     ) {
//       // form has not been updated
//       // no need to make api call
//       goToCourses()
//       return
//     }
//     const formData = new FormData()
//     formData.append("courseId", course._id)
//     const courseStatus = getValues("public")
//       ? COURSE_STATUS.PUBLISHED
//       : COURSE_STATUS.DRAFT
//     formData.append("status", courseStatus)
//     setLoading(true)
//     const result = await editCourseDetails(formData, token)
//     if (result) {
//       goToCourses()
//     }
//     setLoading(false)
//   }

//   const onSubmit = (data) => {
//     // console.log(data)
//     handleCoursePublish()
//   }

//   return (
//     <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="text-2xl font-semibold text-richblack-5">
//         Publish Settings
//       </p>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Checkbox */}
//         <div className="my-6 mb-8">
//           <label htmlFor="public" className="inline-flex items-center text-lg">
//             <input
//               type="checkbox"
//               id="public"
//               {...register("public")}
//               className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
//             />
//             <span className="ml-2 text-richblack-400">
//               Make this course as public
//             </span>
//           </label>
//         </div>

//         {/* Next Prev Button */}
//         <div className="ml-auto flex max-w-max items-center gap-x-4">
//           <button
//             disabled={loading}
//             type="button"
//             onClick={goBack}
//             className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
//           >
//             Back
//           </button>
//           <IconBtn disabled={loading} text="Save Changes" />
//         </div>
//       </form>
//     </div>
//   )
// }