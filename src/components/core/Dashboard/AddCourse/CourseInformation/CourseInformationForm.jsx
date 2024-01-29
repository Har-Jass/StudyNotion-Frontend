import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import IconBtn from "../../../../common/IconBtn";
import toast from 'react-hot-toast';
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { MdNavigateNext } from "react-icons/md";
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInformationForm = () => {
  const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
      // categories ko fetch krne se pehle loading ka tab show krr denge
      setLoading(true);

      // fetching the categories
      const categories = await fetchCourseCategories();

      // agr course categories fetch krke valid categories fetch ho gayi
      if(categories.length > 0) {
        setCourseCategories(categories);
      }

      // categories set krne ke baad loading ko false krr denge
      setLoading(false);
    }

    if(editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    // calling the function to get all the categories
    getCategories();
  }, [])

  // function to check is form updated or not
  const isFormUpdated = () => {
    // pehle saari current values fetch krr lenge
    const currentValues = getValues();

    // ab fields check krr lenge that old field and new field agr different hai means form update hua hai
    // and agr form update hua hai to true return krr denge else false return krr denge
    if(currentValues.courseTitle !== course.courseName || 
       currentValues.courseShortDesc !== course.courseDescription || 
       currentValues.coursePrice !== course.price || 
       currentValues.courseTags.toString() !== course.tag.toString() || 
       currentValues.courseBenefits !== course.whatYouWillLearn || 
       currentValues.courseCategory._id !== course.category._id || 
       currentValues.courseImage !== course.thumbnail || 
       currentValues.courseRequirements.toString() !== course.instructions.toString()) {
      return true;
    }
    else {
      return false;
    }
  }

  // form ke submit hone pe kya action perform krna hai wo yaha mention krr rhe h
  const onSubmit = async(data) => {
    if(editCourse) {
      if(isFormUpdated()) {
        // fetching all the current values
        const currentValues = getValues();
        
        // create a form data object
        const formData = new FormData();

        // first append course id in form data object
        formData.append("courseId", course._id);

        // ab jonsi jonsi fields update hui h sirf unko hi form data object ke ander push krenge
        if(currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if(currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if(currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if(currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if(currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        if(currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        // ab API call krenge edit course ke liye with all the new data
        // API call se pehle loading true krr denge
        setLoading(true);

        // API call krenge
        const result = await editCourseDetails(formData, token);

        // API call final hone ke baad loading ko false krr denge
        setLoading(false);

        // ab result ko validate krenge, agr result theek hai to next step pe move krr jayege
        if(result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No changes made to the form");
      }

      return;
    }

    // create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    // ab API call krenge new course ko add krne ke liye
    // API call se pehle loading true krr denge
    setLoading(true);

    console.log("BEFORE add course API call");
    console.log("PRINTING FORM DATA", formData);

    // API call krenge
    console.log("Token -> ", token);
    const result = await addCourseDetails(formData, token);
    if(result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }

    // API call final hone ke baad loading ko false krr denge
    setLoading(false);

    console.log("PRINTING FORM DATA", formData);
    console.log("PRINTING RESULT -> ", result);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      {/* course title field */}
      <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor='courseTitle' className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>

        {/* adding input field */}
        <input id='courseTitle' placeholder='Enter Course Title' {...register('courseTitle', {required: true})} className="form-style w-full"/>

        {/* handling error */}
        {
          errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Title is required <sup>**</sup>
            </span>
          )
        }
      </div>

      {/* course short description field */}
      <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor='courseShortDesc' className="text-sm text-richblack-5">
          Course Description <sup className="text-pink-200">*</sup>
        </label>

        {/* adding textarea field */}
        <textarea id='courseShortDesc' placeholder='Enter Description' {...register('courseShortDesc', {required: true})} className="form-style resize-x-none min-h-[130px] w-full" />

        {/* handling error */}
        {
          errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required <sup>**</sup>
            </span>
          )
        }
      </div>

      {/* course price field */}
      <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor='coursePrice' className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>

        <div className="relative">
          {/* adding input field */}
          <input id='coursePrice' placeholder='Enter Course Price' {...register('coursePrice', {required: true, valueAsNumber: true})} className="form-style w-full !pl-12" />

          {/* adding rupee icon */}
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        

        {/* handling error */}
        {
          errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required <sup>**</sup>
            </span>
          )
        }
      </div>

      {/* category dropdown menu field */}
      <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor='courseCategory' className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>

        {/* adding dropdown menu */}
        <select id='courseCategory' defaultValue="" {...register("courseCategory", {required: true})} className="form-style w-full">
          <option value="" disabled>
            Choose a Category
          </option>

          {/* baaki ke options "courseCategories" naam ke state variable me store hoga to baaki options waha se map function lgake fetch krr lenge */}
          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category._id}>
                {category?.name}
              </option>
            ))
          }
        </select>

        {/* handling error */}
        {
          errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required <sup>**</sup>
            </span>
          )
        }
      </div>

      {/* handling tag input -> we create a custom component for handling tag input */}
      <ChipInput
        label = "Tags"
        name = "courseTags"
        placeholder = "Enter Tags"
        register = {register}
        errors = {errors}
        setValue = {setValue}
        getValues = {getValues}
      />

      {/* we create a custom component for uploading and showing preview of media */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* benefits of the course field */}
      <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor='courseBenefits' className="text-sm text-richblack-5">
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>

        {/* adding textarea field */}
        <textarea id='courseBenefits' placeholder='Enter Benefits of the Course' {...register('courseBenefits', {required: true})} className="form-style resize-x-none min-h-[130px] w-full" />

        {/* handling error */}
        {
          errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Benefits is required <sup className="text-pink-200">**</sup>
            </span>
          )
        }
      </div>

      {/* requirements or instructions field */}
      <RequirementField 
        name = "courseRequirements"
        label = "Requirements/Instructions"
        register = {register}
        errors = {errors}
        setValue = {setValue}
        getValues = {getValues}
      />

      {/* adding last 2 buttons */}
      <div className="flex justify-end gap-x-2">
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Without Saving
            </button>
          )
        }

        {/* adding yellow wala button */}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm
