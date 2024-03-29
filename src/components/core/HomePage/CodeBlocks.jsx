import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import {CTAButton} from '../HomePage/CTAButton';
import { TypeAnimation } from 'react-type-animation';

export const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/* Section 1 */}
        <div className='flex flex-col w-[50%] gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subHeading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='flex flex-row h-fit text-[10px] w-[100%] py-4 lg:w-[500px]'>
            {/* BG Gradient */}

            {/* Numbering for Code Part */}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1. </p>
                <p>2. </p>
                <p>3. </p>
                <p>4. </p>
                <p>5. </p>
                <p>6. </p>
                <p>7. </p>
                <p>8. </p>
                <p>9. </p>
                <p>10. </p>
                <p>11. </p>
                <p>12. </p>
                <p>13. </p>
                <p>14. </p>
                <p>15. </p>
                <p>16. </p>
                <p>17. </p>
            </div>

            {/* Actual Code Part lies here */}
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                    sequence={[" ", codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block"
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}