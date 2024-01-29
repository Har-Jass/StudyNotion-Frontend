import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {
  // fetching total count from cart slice
  const {total, cart} = useSelector((state) => state.cart);

  // handler function for "Buy Now" Button
  const handleBuyCourse = () => {
    // fetch all the courses use wants to buy
    const courses = cart.map((course) => course._id);

    // jb tk payment integration nahi ho jata tb tk course ko buy nahi krr skte
    // so tb tk ke liye courses ko fetch krke console pe log krwa denge
    console.log("Bought these Courses: ", courses);

    //TODO: API integrate -> payment gateway tak leke jaegi
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">
            Total:
        </p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">
            ₹{total}
        </p>

        {/* Buy Now Button */}
        <IconBtn
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount
