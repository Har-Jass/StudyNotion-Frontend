import React from "react";
import {HighlightText} from "./HighlightText";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../../assets/Images/Compare_with_others.png";
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png";
import {CTAButton} from "./CTAButton";

export const LearningLanguageSection = () => {
    return (
        <div className="mt-[130px] mb-32">
            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center">
                    Your swiss knife for 
                    <HighlightText text={"learning any language"} />
                </div>

                <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
                    Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className="flex flex-row items-center justify-center mt-5">
                    <img src={knowYourProgress} alt="KnowYourProgressImage" className="object-contain -mr-32" />
                    <img src={compareWithOthers} alt="CompareWithOthersImage" className="object-contain" />
                    <img src={planYourLessons} alt="PlanYourLessonsImage" className="object-contain -ml-36" />   
                </div>

                <div className="w-fit">
                    <CTAButton active={true} linkTo={"/signup"}>
                        <div>
                            Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}