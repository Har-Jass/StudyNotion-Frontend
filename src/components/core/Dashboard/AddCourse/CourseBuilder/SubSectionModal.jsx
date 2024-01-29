import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
// import { Form } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx"
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import { useSelector } from 'react-redux';

// SubSectionModal ke component me hmare paas kch data aa rhe hai
// modalData, setModalData ka function, and add, view and edit ke flags aa rhe hai
// agr add, view, and edit ke flags aa rhe h to theek wrna by default false krdenge unko
const SubSectionModal = (modalData, setModalData, add = false, view = false, edit = false) => {
  // useForm hook ka use krke pehle kch default items hook se fetch krr lenge
  const {register, handleSubmit, setValue, formState: {errors}, getValues} = useForm();

  // fetching dispatch to dispatch functions
  const dispatch = useDispatch();

  // creating loading state variable to maintain the state of loading or not
  const [loading, setLoading] = useState(false);

  // fetching token and course data
  const {token} = useSelector((state) => state.auth);
  const {course} = useSelector((state) => state.course);

  // modal me sirf 3 items show hongi, i.e., video, title and description, to un 3 items ko first render pe set krr lenge
  useEffect(() => {
    if(view || edit) {
      // agr view and edit ke flags ki values true aayi hai means hmara lecture already created hai
      // and hum uski values ko form me set krdenge
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  // form updated hai ya nahi usko check krne ke liye function write down krenge
  const isFormUpdated = () => {
    // form ke getValues() wale method se form ki saari values fetch krlenge
    const currentValues = getValues();

    // ab current values, i.e., lecture title, lecture description and lecture video ko modal ke data se match krenge
    if(currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl) {
      // form update hua hai to true return krdenge
      return true;
    }
    else {
      // agr form update nahi hua to false return krdo
      return false;
    }
  }

  // this function will edit the sub-section when onSubmit button is clicked to edit the form
  const handleEditSubSection = async() => {
    // sub section ko edit krne se pehle old values ko fetch krlenge form ke ander se
    const currentValues = getValues();

    // new form data ka object create krr lenge
    const formData = new FormData();

    // ab form ke ander data ko append krr denge
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    // check krr lenge ke old values jo hai wo new values se different hai ke nahi
    // agr different hai to formData me new data append krdenge
    if(currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if(currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    // form me data append ho gaya to loading ko true krr denge
    setLoading(true);

    // ab new data ko save krne ke liye API call krdenge
    const result  = await updateSubSection(formData, token);

    // course ko bhi update krr denge, uske liye setCourse ke function ko dispatch krdenge
    if(result) {
      // course ke updated content ka data le lenge
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section)

      // ab updated course bna lenge
      const updatedCourse = {...course, courseContent: updatedCourseContent};

      dispatch(setCourse(updatedCourse));
    }

    // modal ko close krr denge
    setModalData(null);

    // finally saara kaam hone ke baad loading ko false krdenge
    setLoading(false);
  }

  // form use krr rhe hai to usko submit bhi krenge
  // to onSubmit ka function bhi chahiye
  const onSubmit = async(data) => {
    // agr view wala modal open hai to usme to form submit pe kch hoga nahi
    // to view ke case me return krr jayege
    if(view) {
      return;
    }

    // agr edit ka modal open hai means hum edit krne aaye hai
    if(edit) {
      // to usme pehle ye check krenge that form update hua ke nahi hua
      // agr update kch nahi hua to error toast show krdenge and return krr jayege
      if(!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      }
      // agr form update hua hai to edit sub section ka function call krdenge, jo sub section ko edit krdega and return krr jayega
      else {
        handleEditSubSection();
        return;
      }
    }

    // agr view false hai, edit false hai, means sub section ka new data add krne aye hai
    // to sbse pehle formData object create krke form me se data fetch krr lenge
    const formData = new FormData();
    // modalData ko sectionID se append krdenge
    formData.append("sectionId", modalData);

    // and baaki form ke data ko formData object ke sath append krdenge
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    // ab data ko final set krne se pehle loading true krr denge
    setLoading(true);

    // and ab create ki API call krdenge
    const result = await createSubSection(formData, token);

    // result aane ke baad finally course update krdenge
    if(result) {
      // course ke updated content ka data le lenge
      const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section)

      // ab updated course bna lenge
      const updatedCourse = {...course, courseContent: updatedCourseContent};

      dispatch(setCourse(updatedCourse));
    }

    // modal ke data ko empty bhi krna hoga
    setModalData(null);

    // and saara kaam ho gaya to finally loading ko bhi false krdenge
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          {/* agr hum krne aaye hai to title me Viewing Lecture show krenge */}
          {/* edit krne aaye hai to title me Editing Lecture show krenge */}
          {/* add krne aaye hai to title me editing lecture show krenge */}
          <p className="text-xl font-semibold text-richblack-5"> 
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture 
          </p>

          {/* after the modal title, we add a cross button, and cross click krne se modal close krna hai */}
          {/* and close tbhi krna hai jb sb kch load ho chuka ho */}
          {/* ternary operator ka use krke agr loading false hai to modal close krdo wrna kch bhi mt kro */}
          <button onClick={() => (!loading ? setModalData(null): {})}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
          {/* sbse pehle we have Video Upload section hai */}
          {/* uske liye hmare paas already ek component created hai, jiske through hum Video Upload krr skte hai */}
          {/* to uss component ko render krwa denge */}
          <Upload 
            name = "lectureVideo"
            label = "Lecture Video"
            register = {register}
            setValue = {setValue}
            errors = {errors}
            video = {true}

            // agr view and edit ke dono flags false hai to component empty show hoga, means usme video upload krne ka option show hoga
            // agr dono me se kch bhi true hai to normal video show hogi
            viewData = {view ? modalData.videoUrl: null}
            editData = {edit ? modalData.videoUrl: null}
          />

          {/* label container */}
          <div className="flex flex-col space-y-2">
            {/* adding label */}
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title <sup className="text-pink-200">*</sup>
            </label>

            {/* adding input field */}
            <input 
              disabled={view || loading}
              id = 'lectureTitle'
              placeholder = 'Enter Lecture Title'
              {...register("lectureTitle", {required:true})}
              className = 'form-style w-full'
            />

            {/* handling error */}
            {
              errors.lectureTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture title is required <sup className="text-pink-200">**</sup>
                </span>
              )
            }
          </div>
          
          {/* description container */}
          <div className="flex flex-col space-y-2">
            {/* adding label */}
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {
                !view && <sup className="text-pink-200">*</sup>
              }
            </label>

            {/* adding text area */}
            <textarea 
              disabled={view || loading}
              id = 'lectureDesc'
              placeholder = 'Enter Lecture Description'
              {...register("lectureDesc", {required:true})}
              className="form-style resize-x-none min-h-[130px] w-full"
            />

            {/* handling error */}
            {
              errors.lectureDesc && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Lecture description is required <sup className="text-pink-200">**</sup>
                </span>
              )
            }
          </div>

          {/* ab end me humko buttons show ho rhe hai */}
          {/* view sub section krne ke case me koi bhi button show nahi hoga */}
          {/* edit sub section krne ke case me "Save Changes" ka button show hoga */}
          {/* add sub section krne ke case me "Save" ka button show hoga */}
          {
            !view && (
              <div className="flex justify-end">
                <IconBtn disabled={loading} text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />
              </div>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal







// // BELOW CODE IS COPY PASTED FROM BABBAR'S CODE
// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { RxCross2 } from "react-icons/rx"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   createSubSection,
//   updateSubSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"
// import IconBtn from "../../../../common/IconBtn"
// import Upload from "../Upload"

// export default function SubSectionModal({
//   modalData,
//   setModalData,
//   add = false,
//   view = false,
//   edit = false,
// }) {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//   } = useForm()

//   // console.log("view", view)
//   // console.log("edit", edit)
//   // console.log("add", add)

//   const dispatch = useDispatch()
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)

//   useEffect(() => {
//     if (view || edit) {
//       // console.log("modalData", modalData)
//       setValue("lectureTitle", modalData.title)
//       setValue("lectureDesc", modalData.description)
//       setValue("lectureVideo", modalData.videoUrl)
//     }
//   }, [])

//   // detect whether form is updated or not
//   const isFormUpdated = () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     if (
//       currentValues.lectureTitle !== modalData.title ||
//       currentValues.lectureDesc !== modalData.description ||
//       currentValues.lectureVideo !== modalData.videoUrl
//     ) {
//       return true
//     }
//     return false
//   }

//   // handle the editing of subsection
//   const handleEditSubsection = async () => {
//     const currentValues = getValues()
//     // console.log("changes after editing form values:", currentValues)
//     const formData = new FormData()
//     // console.log("Values After Editing form values:", currentValues)
//     formData.append("sectionId", modalData.sectionId)
//     formData.append("subSectionId", modalData._id)
//     if (currentValues.lectureTitle !== modalData.title) {
//       formData.append("title", currentValues.lectureTitle)
//     }
//     if (currentValues.lectureDesc !== modalData.description) {
//       formData.append("description", currentValues.lectureDesc)
//     }
//     if (currentValues.lectureVideo !== modalData.videoUrl) {
//       formData.append("video", currentValues.lectureVideo)
//     }
//     setLoading(true)
//     const result = await updateSubSection(formData, token)
//     if (result) {
//       // console.log("result", result)
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData.sectionId ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   const onSubmit = async (data) => {
//     // console.log(data)
//     if (view) return

//     if (edit) {
//       if (!isFormUpdated()) {
//         toast.error("No changes made to the form")
//       } else {
//         handleEditSubsection()
//       }
//       return
//     }

//     const formData = new FormData()
//     formData.append("sectionId", modalData)
//     formData.append("title", data.lectureTitle)
//     formData.append("description", data.lectureDesc)
//     formData.append("video", data.lectureVideo)
//     setLoading(true)
//     const result = await createSubSection(formData, token)
//     if (result) {
//       // update the structure of course
//       const updatedCourseContent = course.courseContent.map((section) =>
//         section._id === modalData ? result : section
//       )
//       const updatedCourse = { ...course, courseContent: updatedCourseContent }
//       dispatch(setCourse(updatedCourse))
//     }
//     setModalData(null)
//     setLoading(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5">
//             {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
//           </p>
//           <button onClick={() => (!loading ? setModalData(null) : {})}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>
//         {/* Modal Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-8 px-8 py-10"
//         >
//           {/* Lecture Video Upload */}
//           <Upload
//             name="lectureVideo"
//             label="Lecture Video"
//             register={register}
//             setValue={setValue}
//             errors={errors}
//             video={true}
//             viewData={view ? modalData.videoUrl : null}
//             editData={edit ? modalData.videoUrl : null}
//           />
//           {/* Lecture Title */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
//               Lecture Title {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <input
//               disabled={view || loading}
//               id="lectureTitle"
//               placeholder="Enter Lecture Title"
//               {...register("lectureTitle", { required: true })}
//               className="form-style w-full"
//             />
//             {errors.lectureTitle && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture title is required
//               </span>
//             )}
//           </div>
//           {/* Lecture Description */}
//           <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
//               Lecture Description{" "}
//               {!view && <sup className="text-pink-200">*</sup>}
//             </label>
//             <textarea
//               disabled={view || loading}
//               id="lectureDesc"
//               placeholder="Enter Lecture Description"
//               {...register("lectureDesc", { required: true })}
//               className="form-style resize-x-none min-h-[130px] w-full"
//             />
//             {errors.lectureDesc && (
//               <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Lecture Description is required
//               </span>
//             )}
//           </div>
//           {!view && (
//             <div className="flex justify-end">
//               <IconBtn
//                 disabled={loading}
//                 text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   )
// }