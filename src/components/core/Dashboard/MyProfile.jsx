import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from "../../../utils/dateFormatter"

const MyProfile = () => {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <>
        {/* Heading */}
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>

        {/* Section 1 */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            {/* Part 1 */}
            <div className="flex items-center gap-x-4">
                <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Part 2 */}
            <IconBtn text="Edit" onclick={() => {
                navigate("/dashboard/settings")
            }}>
                <RiEditBoxLine />
            </IconBtn>
        </div>

        {/* Section 2 */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            {/* Part 1 */}
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">
                    About
                </p>
                <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}}>
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            {/* Part 2 */}
            <p className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                {user?.additionalDetails?.about ?? "Write Something About Yourself"}
            </p>
        </div>

        {/* Section 3 */}
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            {/* Part 1 */}
            <div className="flex w-full items-center justify-between">
                <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                <IconBtn text="Edit" onclick={() => {navigate("/dashboard/settings")}}>
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            {/* Part 2 */}
            <div className="flex max-w-[500px] justify-between">
                <div className="flex flex-col gap-y-5">
                    {/* First Name Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            First Name
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.firstName}
                        </p>
                    </div>

                    {/* Email Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            Email
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.email}
                        </p>
                    </div>

                    {/* Gender Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            Gender
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.gender ?? "Add Gender"}
                        </p>
                    </div>
                </div>

                
                <div className="flex flex-col gap-y-5">
                    {/* Last Name Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            Last Name
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.lastName}
                        </p>
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            Phone Number
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                        </p>
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                        <p className="mb-2 text-sm text-richblack-600">
                            Date of Birth
                        </p>
                        <p className="text-sm font-medium text-richblack-5">
                            {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>  
  )
}

export default MyProfile