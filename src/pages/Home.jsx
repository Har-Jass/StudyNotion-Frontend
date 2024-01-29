import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import {CTAButton} from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { TimelineSection } from '../components/core/HomePage/TimelineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import { Footer } from '../components/common/Footer';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';

export const Home = () => {
  return (
    <div>
        {/* SECTION -> 1 */}
        {/* creating Section 1, i.e., First Blue Part of Home Page */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>
          <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
              <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight />
              </div>
            </div>
          </Link>     

          <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text={" Coding Skills"} />
          </div>

          <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from Instructors.
          </div>

          <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkTo={"/signup"}>
              Learn More
            </CTAButton>

            <CTAButton active={false} linkTo={"/login"}>
              Book a Demo
            </CTAButton>
          </div>

          <div className='shadow-blue-200 mx-3 my-12'>
            <video muted loop autoPlay>
              <source src={Banner} type="video/mp4" />
            </video>
          </div>

          {/* Code Section 1 */}
          <div>
            <CodeBlocks 
              position={"lg: flex-row"}
              heading={
                <div className='text-4xl font-semibold  '>
                  Unlock your
                  <HighlightText text={" coding potential "} />
                  with our online courses.
                </div>
              }
              subHeading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={
                {
                  btnText: "Try it Yourself",
                  linkTo: "/signup",
                  active: true
                }
              }
              ctabtn2={
                {
                  btnText: "Learn More",
                  linkTo: "/login",
                  active: false
                }
              }
              codeblock={
                `<!DOCTYPE html>
                  <html>
                    <head>
                      <title>Example</title>
                      <link rel="stylesheet" href="styles.css" />
                    </head>
                    <body>
                      <h1>
                        <a href="/">Header</a>
                      </h1>
                      <nav>
                        <a href="one/">One</a>
                        <a href="two/">Two</a>
                        <a href="three/">Three</a>
                      </nav>
                    </body>
                  </html>`
              }
              codeColor={"text-yellow-25"}
            />
          </div>

          {/* Code Section 2 */}
          <div>
            <CodeBlocks 
              position={"lg: flex-row-reverse"}
              heading={
                <div className='text-4xl font-semibold'>
                  Start
                  <HighlightText text={" coding in seconds "} />
                </div>
              }
              subHeading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={
                {
                  btnText: "Continue Lesson",
                  linkTo: "/signup",
                  active: true
                }
              }
              ctabtn2={
                {
                  btnText: "Learn More",
                  linkTo: "/login",
                  active: false
                }
              }
              codeblock={
                `<!DOCTYPE html>
                  <html>
                    <head>
                      <title>Example</title>
                      <link rel="stylesheet" href="styles.css" />
                    </head>
                    <body>
                      <h1>
                        <a href="/">Header</a>
                      </h1>
                      <nav>
                        <a href="one/">One</a>
                        <a href="two/">Two</a>
                        <a href="three/">Three</a>
                      </nav>
                    </body>
                  </html>`
              }
              codeColor={"text-yellow-25"}
            />
          </div>

          <ExploreMore />
        </div>
        
        {/* SECTION -> 2 */}
        {/* creating Section 2, i.e., First White Part of Home Page */}
        <div className="bg-pure-greys-5 text-richblack-700">
          <div className="homepage_bg h-[310px]">
            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
              <div className="h-[150px]"></div>
              <div className="flex flex-row gap-7 text-white">
                <CTAButton active={true} linkTo={"/signup"}>
                  <div className="flex items-center gap-3">
                    Explore Full Catalogue
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active={false} linkTo={"/signup"}>
                  <div className="flex items-center gap-3">
                    Learn More
                  </div>
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
            <div className="flex flex-row gap-5 mb-10 mt-[95px]">
              <div className="text-4xl font-semibold w-[45%]">
                Get the skills you need for a
                <HighlightText text={"job that is in demand."} />
              </div>
              <div className="flex flex-col gap-10 w-[40%] items-start">
                <div className="text-[16px]">
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <CTAButton active={true} linkTo={"/signup"}>
                  <div>
                    Learn More 
                  </div>
                </CTAButton>
              </div>
            </div>

            <TimelineSection />

            <LearningLanguageSection />
          </div>
        </div>
        
        {/* SECTION -> 3 */}
        {/* creating Section 3, i.e., Second Blue Part of Home Page */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
          <InstructorSection />

          <h2 className='text-center text-4xl font-semibold mt-10'>
              Reviews from other learners
          </h2>

          {/* Review Slider */}
        </div>
        
        {/* SECTION -> 4 */}
        {/* creating Section 4, i.e., Footer */}
        <Footer />
    </div>
  )
}