import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from '../../services/apiconnector';
import {contactusEndpoint} from '../../services/apis';
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    // form ke submit hote hi ye submitContactForm() function call hoga
    const submitContactForm = async(data) => {
        console.log("Logging Form Data -> ", data);
        try {
            // form ke submit hote hi loading ko true krr denge
            setLoading(true);

            // ab form submit hone ke baad form ka data kahi na kahi jake save hoga, to uske liye koi backend API ki need hogi
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            // const response = {status:"OK"};

            // log the response on console
            console.log(response);

            // data aane ke baad loading ko false krdenge
            setLoading(false);
        }
        catch(err) {

            console.log("Error -> ", err.message);

            // agr error aaya to error aane ke baad bhi loading ko false krdenge, kahi aisa na ho ke loader hi ghumta reh jaye
            setLoading(false);
        }
    }

    // hmare paas useForm() library ke ander "isSubmitSuccessful" ke naam se ek boolean variable hai
    // agr ye "isSubmitSuccessful" true ho gaya means hmara form successfully submit ho chuka hai
    // and agr form successfully submit ho gaya hai to form ki saari fields ko reset krdenge to uske liye hum useEffect() hook ka use krenge
    // useEffect() hook form ko reset krdega jaise hi "isSubmitSuccessful" ki value true ho jayegi
    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        // jaise hi hmara form submit hoga tbhi handleSubmit() function ko call krr denge
        // and handleSubmit() function submitContactForm() function ko call krr dega
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">
                {/* firstName and lastName div */}
                <div className="flex flex-col gap-5 lg:flex-row">
                    {/* firstName div */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='firstName' className="label-style">
                            First Name
                        </label>
                        <input 
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            className="form-style"
                            
                            // ab hum first name wali field ko register krne wale hai and usme validation ko true krdenge means ye field mandatory hogi isko fill krna zruri hoga
                            {...register("firstName", {required: true})}
                        />
                        {/* ab agr koi error aata hai first name wali field se related to uss error ko handle krr lenge */}
                        {
                            errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    First name is required
                                </span>
                            )
                        }
                    </div>

                    {/* lastName div */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='lastName' className="label-style">
                            Last Name
                        </label>
                        <input 
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            className="form-style"
                            
                            // ab hum last name wali field ko register krne wale hai and usme validation ko true krdenge means ye field mandatory hogi isko fill krna zruri hoga
                            {...register("lastName", {required: true})}
                        />
                        {/* ab agr koi error aata hai last name wali field se related to uss error ko handle krr lenge */}
                        {
                            errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Last name is required
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* email div */}
                <div className="flex flex-col gap-2">
                    <label htmlFor='email' className="label-style">
                        Email Address
                    </label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        className="form-style"
                            
                        // ab hum last name wali field ko register krne wale hai and usme validation ko true krdenge means ye field mandatory hogi isko fill krna zruri hoga
                        {...register("email", {required: true})}
                    />
                    {/* ab agr koi error aata hai email wali field se related to uss error ko handle krr lenge */}
                    {
                        errors.email && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Email address is required
                            </span>
                        )
                    }
                </div>

                {/* phone number div */}
                <div className="flex flex-col gap-2">
                    {/* label field */}
                    <label htmlFor='phoneNumber' className="label-style">
                        Phone Number
                    </label>
                    
                    {/* dropdown and phone number input field */}
                    <div className="flex gap-5">
                        <div className="flex w-[75px] flex-col gap-2">
                            {/* dropdown field */}
                            <select className="form-style" name='dropdown' id='dropdown' {...register("countryCode", {required: true})}>
                                {
                                    CountryCode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.code} selected={element.country === "India"}>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                        <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            {/* phone number input field */}
                            <input
                                type='number'
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='12345-67890'
                                className="form-style"
                                {...register("phoneNo", {
                                    required: {value: true, message: "Phone number is required"},
                                    maxLength: {value: 10, message: "Invalid phone number"},
                                    minLength: {value: 10, message: "Invalid phone number"}
                                })}
                            />
                        </div>
                    </div>

                    {/* ab agr koi error aata hai phone number wali field se related to uss error ko handle krr lenge */}
                    {
                        errors.phoneNo && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
                </div>

                {/* message box div */}
                <div className="flex flex-col gap-2">
                    <label htmlFor='message' className="label-style">
                        Message
                    </label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter your message here'
                        className="form-style"

                        // ab hum last name wali field ko register krne wale hai and usme validation ko true krdenge means ye field mandatory hogi isko fill krna zruri hoga
                        {...register("message", {required: true})}
                    />
                    {/* ab agr koi error aata hai message wali field se related to uss error ko handle krr lenge */}
                    {
                        errors.message && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Message is required
                            </span>
                        )
                    }
                </div>

                {/* button */}
                <button
                    disabled={loading}
                    type="submit"
                    className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
                >
                    Send Message
                </button>
        </form>
    )
}

export default ContactUsForm