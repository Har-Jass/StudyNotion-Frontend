import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
  // requirement ka state variable jo entered requirement store krega
  const [requirement, setRequirement] = useState("");

  // requirement list ka state variable jo requirement ki saari list ko store krega so that unko show krwa paye
  const [requirementList, setRequirementList] = useState([]);

  // requirement field ko register bhi krna pdega and usko apne pehle render pe register krenge
  useEffect(() => {
    register(name, {required: true, validate: (value) => value.length > 0});
  }, [])

  // YE NAHI SMJH AAYA KE KYU HUA??
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList])

  // ab 2 functions write down krege, ek requirement ko list me add krega and dusra requirements ko list me se remove krega
  const handleAddRequirement = () => {
    // sbse pehle check krenge that requirement me data aaya bhi hai ya nahi
    // agr aa gaya to add krdo list ke ander
    if(requirement) {
        // list ke ander pehle purana wala saara data insert krr denge, then new requirement insert krr denge
        setRequirementList([...requirementList, requirement]);

        // list me add krne ke baad current data ko empty krr denge
        setRequirement("");
    }
  }

  // remove function me index pass krenge so that uss index ki slice ko remove krr paye
  const handleRemoveRequirement = (index) => {
    // sbse pehle saare requirement list ko ek variable me store krr lenge
    const updatedRequirementList = [...requirementList];

    // ab uss list me se jo requirement hmko remove krni hai usko splice method ka use krke remove krr denge
    updatedRequirementList.splice(index, 1);

    // ab original requirement list ko update krr denge
    setRequirementList(updatedRequirementList);
  }

  return (
    <div className="flex flex-col space-y-2">
        {/* adding label */}
        <label htmlFor={name} className="text-sm text-richblack-5">
            {label} <sup className="text-pink-200">*</sup>
        </label>

        <div className="flex flex-col items-start space-y-2">
            {/* adding input field */}
            <input type='text' id={name} value={requirement} onChange={(e) => setRequirement(e.target.value)} className="form-style w-full" />

            {/* adding button to add requirements */}
            <button type='button' onClick={handleAddRequirement} className="font-semibold text-yellow-50">
                Add
            </button>
        </div>

        {/* showing all requirements and clear button to remove the requirements */}
        {
            // agr requirement list ki length greater than 0 hai means instructor ne requirement list me items add kri hui hai
            // and agr requirement list me items added hai tbhi unko render krenge wrna nahi krenge
            requirementList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {/* requirement ki jo list hai uspe map function lgake saari requirements ko render krwa denge */}
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className="flex items-center text-richblack-5">
                                {/* showing requirement */}
                                <span>
                                    {requirement}
                                </span>

                                {/* showing button to clear the requirement */}
                                <button type='button' onClick={() => handleRemoveRequirement(index)} className="ml-2 text-xs text-pure-greys-300">
                                    Clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

        {/* handling errors */}
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required <sup className="text-pink-200">**</sup>
                </span>
            )
        }
    </div>
  )
}

export default RequirementField
