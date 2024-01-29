import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourseForm from './PublishCourse/PublishCourseForm';

export default function RenderSteps() {
  const {step} = useSelector((state) => state.course);

  // Add Course ke page pe jo form render hone ke steps hai
  // wo steps ko form ke hisaab se highlight honge  
  const steps = [
    {
        id: 1,
        title: "Course Information"
    },
    {
        id: 2,
        title: "Course Builder"
    },
    {
        id: 3,
        title: "Publish"
    }
  ]

  return (
    <>
        {/* jo bhi steps honge wo hum log steps ke no. display krwayege */}
        <div className="relative mb-2 flex w-full justify-center">
            {
                steps.map((item) => (
                    <>
                        <div className="flex flex-col items-center" key={item.id} >
                            <button
                                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                                step === item.id
                                ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                                : "border-richblack-700 bg-richblack-800 text-richblack-300"
                                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
                            >
                                {step > item.id ? (
                                    <FaCheck className="font-bold text-richblack-900" />
                                ) : (
                                    item.id
                                )}
                            </button>
                        </div>
                        {
                            item.id !== steps.length && (
                                <>
                                    <div className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                                    } `}>
                                    </div>
                                </>
                            )
                        }
                    </>
                ))
            }
        </div>

        {/* jo bhi steps honge wo step ke no. ke niche uska title bhi display krwayege */}
        <div className="relative mb-16 flex w-full select-none justify-between">
            {
                steps.map((item) => (
                    <>
                        <div className="flex min-w-[130px] flex-col items-center gap-y-2" key={item.id}>
                            <p
                                className={`text-sm ${
                                step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    </>
                ))
            }
        </div>
        
        {/* agr to hum step 1 pe hai to Course ki information ka Form display kro */}
        {
            step === 1 && <CourseInformationForm />
        }

        {/* agr to hum step 2 pe hai to Course ko Build krne ka Form display kro */}
        {
            step === 2 && <CourseBuilderForm />
        }

        {
            step === 3 && <PublishCourseForm />
        }
    </>
  )
}




// // BELOW CODE IS COPY PASTED FROM BABBAR'S CODE
// import { FaCheck } from "react-icons/fa"
// import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"


// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-richblack-900" />
//                 ) : (
//                   item.id
//                 )}
//               </button>
              
//             </div>
//             {item.id !== steps.length && (
//               <>
//                 <div
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}
//                 ></div>
//               </>
//             )}
//           </>
//         ))}
//       </div>

//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>
//       {/* Render specific component based on current step */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {/* {step === 3 && <PublishCourse />} */}
//     </>
//   )
// }