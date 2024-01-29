import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {RxDropdownMenu} from 'react-icons/rx';
import {MdEdit} from 'react-icons/md';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {BiSolidDownArrow} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { IoFastFood } from 'react-icons/io5'

const NestedView = ({handleChangeEditSectionName}) => {
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    console.log("Rendering it again");
  });

  // section ko delete krne ka logic
  const handleDeleteSection = async(sectionId) => {
    // section ko delete krne ki API call krr rhe hai
    const result = await deleteSection({
        sectionId,
        courseId: course._id
    }, token);

    console.log("PRINTING AFTER DELETE SECTION -> ", result);
    
    // ab course ko update krr denge jo bhi result aaya hai
    if(result) {
        dispatch(setCourse(result))
    }

    // section delete krne ke baad confirmation modal ki need nahi h to confirmation modal ko close krdenge
    setConfirmationModal(null);
  }

  // sub section ko delete krne ka logic
  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({
        subSectionId, 
        sectionId
    }, token);

    // delete sub section ki API, response me updated section return krr rhi hai
    // section ko directly course me set nahi krr skte
    // section ko course me convert krenge then set krenge
    // ab course ko update krr denge jo bhi result aaya hai
    if(result) {
        // course ke updated content ka data le lenge
        const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)

        // ab updated course bna lenge
        const updatedCourse = {...course, courseContent: updatedCourseContent};

        dispatch(setCourse(updatedCourse));
    }

    // section delete krne ke baad confirmation modal ki need nahi h to confirmation modal ko close krdenge
    setConfirmationModal(null);
  }

  return (
    <div>
        <div className='rounded-lg bg-richblack-700 p-6 px-8 mt-10'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu />
                                <p>
                                    {section.sectionName}
                                </p>
                            </div>

                            <div className='flex items-center gap-x-3'>
                                <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit />
                                </button>

                                <button onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                }}>
                                    <RiDeleteBin6Line />
                                </button>
                                
                                {/* inserting horizontal line */}
                                <span>|</span>
                                
                                {/* dropdown icon */}
                                <BiSolidDownArrow className={`text-xl text-richblack-300`} />
                            </div>
                        </summary>
                        
                        {/* rendering sub sections */}
                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data?._id} onClick={() => setViewSubSection(data)} className='flex items-center justify-between gap-x-3 border-b-2'>
                                        {/* icon & name of sub-section */}
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu />
                                            <p>
                                                {data.title}
                                            </p>
                                        </div>

                                        {/* niche wale div ka jo parent div hai, usme onClick lgaya hai, jo sub section ko view krta */}
                                        {/* hum chahte hai that niche wale div me wo cheez apply na ho */}
                                        {/* to uske liye niche wale div me onClick pe stop propagation function run krr denge */}
                                        <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-x-3'>
                                            <button onClick={() => setEditSubSection({...data, sectionId: section._id})}>
                                                <MdEdit />
                                            </button>

                                            <button onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this section",
                                                    text2: "All the lectures in this section will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })
                                            }}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                            {/* add lecture button to add lectures in sub-sections */}
                            <button onClick={() => setAddSubSection(section._id)} className='mt-4 flex items-center gap-x-2 text-yellow-50'>
                                <AiOutlinePlus />
                                <p> Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>

        {/* har operation ka ek modal show krenge */}
        {
            addSubSection ? 
            (<SubSectionModal 
                modalData = {addSubSection}
                setModalData = {setAddSubSection}
                add = {true}
            />) 
            : viewSubSection ? 
            (<SubSectionModal 
                modalData = {viewSubSection}
                setModalData = {setViewSubSection}
                view = {true}
            />) 
            : editSubSection ? 
            (<SubSectionModal 
                modalData = {editSubSection}
                setModalData = {setEditSubSection}
                edit = {true}
            />) 
            : (
                <div></div>
            )
        }

        {/* rendering confirmation modal */}
        {
            confirmationModal ? (
                <ConfirmationModal modalData = {confirmationModal} />
            ):(
                <div>

                </div>
            )
        }
    </div>
  )
}

export default NestedView