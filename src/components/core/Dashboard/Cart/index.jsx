import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
  // fetching total amount of cart and totalItems present in the cart from cart slice
  const {total, totalItems} = useSelector((state) => state.cart);   

  return (
    <>
      {/* heading */}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Cart</h1>

      {/* showing how many courses is present in user's cart, i.e., showing item count */}
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in your cart
      </p>

      {/* ab amount pe condit ional rendering krenge */}
      {/* agr cart ka amount 0 se zyada hai means cart me kch courses added hai */}
      {/* and agr cart me courses added hai to Courses ko Render krdenge and Total Amount ko Render krdenge */}
      {/* and cart ka amount 0 hai to directly display krdenge that "Your Cart is Empty, Your shopping cart is waiting. Give it purpose" */}
      {
        total > 0 ? (
            <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
              <RenderCartCourses />
              <RenderTotalAmount />
            </div>
        ) : (
            <p className="mt-14 text-center text-3xl text-richblack-100">
                Your Cart is Empty.
            </p>
        )
      }
    </>
  )
}

export default Cart
