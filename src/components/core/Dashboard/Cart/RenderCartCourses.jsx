import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
  // ab jo cart ka data hai wo hmare paas Cart Slice me pda hua hai, to cart Slice me se wo data fetch krr lenge 
  const {cart} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
        {
            cart.map((course, index) => (
                <div key={course._id} 
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                    index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                  } ${index !== 0 && "mt-6"} `}>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        {/* adding course thumbnail */}
                        <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />

                        <div className="flex flex-col space-y-1">
                            {/* adding course name */}
                            <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>

                            {/* adding course category name */}
                            <p className="text-sm text-richblack-300">{course?.category?.name}</p>

                            {/* adding course rating */}
                            <div className="flex items-center gap-2">
                                {/* add the average rating of the course */}
                                <span className="text-yellow-5">
                                    4.5
                                </span>

                                {/* adding stars according to the course rating */}
                                <ReactStars
                                    count={5}
                                    value={course?.ratingAndReviews?.length}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<IoIosStarOutline />}
                                    halfIcon={<IoIosStarHalf />}
                                    fullIcon={<IoIosStar />}
                                />

                                {/* adding review count that how many student give their rating to the course */}
                                <span className="text-richblack-400">
                                    {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* adding remove button and price of the course */}
                    <div className="flex flex-col items-end space-y-2">
                        {/* adding delete Icon and text on the button */}
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line />
                            <span>
                                Remove
                            </span>
                        </button>

                        {/* adding course price */}
                        <p className="mb-6 text-3xl font-medium text-yellow-100">
                            ₹{course?.price}
                        </p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses
