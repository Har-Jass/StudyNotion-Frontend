import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {GrAddCircle} from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import {BiRightArrow} from 'react-icons/bi';
import toast from 'react-hot-toast';
import { setStep, setCourse, setEditCourse } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import { useEffect } from 'react';

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState:{errors}} = useForm();

  // create section ka jo button hai wo 2 kaam krr rha h
  // agr to edit section ki form me hai hum to wo button Edit Section Name ka ho jata hai
  // agr to create section ki form me hai hum to wo button Create Section name ka ho jata hai
  // to uss case ko handle krne ke liye ek state variable lena pdega
  // if editSectionName is true then Button Text is "Edit Section Name", if its false then Button Text is "Section Name"
  const [editSectionName, setEditSectionName] = useState(null);

  // agr course ke ander section and sub-sections available honge to hi unko render krwayege
  // to section and sub-sections check krne ke liye course ko import krna pdega
  const {course} = useSelector((state) => state.course);

  // back button pe click krne se hum last step pe wapis jate hai
  // to step 2 ko dispatch krenge
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    console.log("EDIT SECTION FLAG -> ", editSectionName);
  });
  
  // agr "Cancel Edit ke button pe click hoga to ye function run hoga"
  const cancelEdit = () => {
    // cancel edit me "editSectionName" ke state variable ko wapis se false mark krr denge to Edit Cancel ho jayega
    setEditSectionName(null);

    // and sath sath form me sectionName ki jo values hai unko bhi empty set krdenge
    setValue("sectionName", "");
  }

  // jb bhi hum sections and sub-sections create krne wali screen pe honge
  // tb hmko back ka button show hoga
  // and uspe click krke ye function call hoga
  const goBack = () => {
    dispatch(setStep(1));

    // course ko edit krne jaa rhe h to edit course ke flag ko true mark krenge
    dispatch(setEditCourse(true));
  }

  // jb bhi hum sections and sub-sections create krne wali screen pe honge
  // tb hmko next ka button show hoga
  // and uspe click krke ye function call hoga
  const goToNext = () => {
    // next hum tb tk nahi krr skte jb tk atleast 1 section and 1 sub-section available nahi hoga
    if(course?.courseContent?.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    // sub-section ki length bhi check krenge
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    // agr ek course me section and sub-section dono available hai, to next step pe chle jayege, i.e., step 3 pe chle jayege
    dispatch(setStep(3));
  }

  // form ke submit hone pe ye function call hoga
  const onSubmit = async(data) => {
    setLoading(true);
    let result;

    console.log("TOKEN -> ", token);

    // submit krne se pehle check krr lenge ke hum edit krne aaye hai ya create krne aaye hai
    // agr editSectionName true hai, means hum section ko edit krne aaye hai
    if(editSectionName) {
      // we are editing the section name, so call edit wali API
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      }, token);
    }
    // else hum section ko create krne aaye hai
    else {
      console.log("CREATING A COURSE SECTION.....");
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token);
    }

    // agr result aaya to values update krr denge
    if(result) {
      dispatch(setCourse(result));
      
      // course edit krdiya to form ko wapis se null mark krdenge
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    
    // loading ko false krr denge
    setLoading(false);

    console.log("ENTERING IN NESTED VIEW");
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='text-white'>
      {/* title */}
      <p>
        Course Builder
      </p>

      {/* creating form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* label container */}
        <div>
          {/* label */}
          <label className="text-sm text-richblack-5" htmlFor='sectionName'>
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          {/* adding input field */}
          <input 
            id='sectionName'
            placeholder='Add Section Name'
            {...register("sectionName", {required: true})}
            className="form-style w-full"
          />

          {/* handle errors */}
          {
            errors.sectionName && (
              <span>
                Section Name is required <sup>**</sup>
              </span>
            )
          }
        </div>
        
        {/* button container */}
        <div className='mt-10 flex w-full'>
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <GrAddCircle className='text-yellow-50' size={20} />
          </IconBtn>

          {/* agr editSectionName wala flag variable true hota hai to uss time "Edit Section Name" wala Button show hota hai */}
          {/* and uss Button ke sath sath ek "Cancel Edit" ka bhi Button hota hai, to condition ke hisaab se "Cancel Edit" ka button bhi show krenge */}
          {
            editSectionName && (
              <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline ml-10'>
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

      {/* creating nested view -> jb hum section create krr chuke honge uske baad sub-section create krne ka option ayega */}
      {/* sub-section ke option ko nested view bolte hai */}
      {/* agr course ke ander ke content ki length 0 se zyada hai, means course ke ander data pdaa hua hai */}
      {/* and agr course ke ander data pda hua hai tbhi NestedView ko render krenge */}
      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }

      {/* NestedView ke baad "Back" and "Next" ka Button show krna hai */}
      <div className='flex justify-between gap-x-3 mt-10'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>

        <IconBtn text="Next" onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm