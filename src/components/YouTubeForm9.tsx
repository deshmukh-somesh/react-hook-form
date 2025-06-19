
// Video -> React Hook Form Tutorial - 14 - Arrays

import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';


type FormValues = {
    username: string,
    email: string,
    channel: string,
    social: {
        twitter: string,
        facebook: string,
    },
    phoneNumber: string[];
}

export const YouTubeForm9 = () => {

    // Version 1: 
    const form = useForm<FormValues>({
        defaultValues: {
            username: "Batman",
            email: "",
            channel: "",
            social: {
                twitter: "",
                facebook: "",
            },
            phoneNumber: ["", ""]

        }
    });

    // Version 2 : 
    // const form = useForm<FormValues>({
    //     defaultValues: async () => {
    //         const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //         const data = await response.json();
    //         return {
    //             username: "Batman",
    //             email: data.email,
    //             channel: ""
    //         }
    //     }
    // })


    const { register, control, handleSubmit, formState } = form;

    // Step 1 :  Define submit function 
    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data)
    }

    const { errors } = formState;
    return (
        <div>
            <h1>Youtube Form</h1>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username'  {...register("username", {
                        required: "Username is required",
                    },

                    )} />
                    <p className="error">{errors.username?.message}</p>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' {...register('email', {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email format'
                        },
                        required: "Email is required",
                        // validate: (fieldValue) => {
                        //     return fieldValue !== "admin@example.com" || "Enter another email address"
                        // }

                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== "admin@example.com" ||
                                    "Enter a different email Address"
                                );
                            },

                            notBlackListed: (fieldValue) => {
                                return (
                                    !fieldValue.endsWith("baddomain.com") ||
                                    "This domain is not supported"
                                )
                            }
                        }
                    })} />
                    <p className='error'>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel'  {...register("channel", {
                        required: "Channel name is required."

                    })} />
                    <p className='error'>{errors.channel?.message}</p>
                </div>
                <div>
                    <label htmlFor='twitter'>Twitter</label>
                    <input type='text' id='twitter'  {...register("social.twitter", {
                        required: "Twitter username is required."

                    })} />
                    <p className='error'>{errors.social?.twitter?.message}</p>
                </div>
                <div>
                    <label htmlFor='facebook'>Facebook</label>
                    <input type='text' id='facebook'  {...register("social.facebook", {
                        required: "Facebook username is required."

                    })} />
                    <p className='error'>{errors.social?.facebook?.message}</p>
                </div>
               
                <div>
                    <label htmlFor='primary-phone'>Primary Phone number</label>
                    <input type='text' id='primary-phone'  {...register("phoneNumber.0", {
                        required: "Primary phone number is required."

                    })} />
                    <p className='error'>{errors.phoneNumber?.[0]?.message}</p>
                </div>
                <div>
                    <label htmlFor='secondary-phone'>Secondary Phone number</label>
                    <input type='text' id='secondary-phone'  {...register("phoneNumber.1", {
                        required: "Secondary Phone number is required."

                    })} />
                    <p className='error'>{errors.phoneNumber?.[1]?.message}</p>
                </div>
                <button className="mt-4 bg-amber-700 border-amber-400 w-20 h-10 rounded-2xl">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
} 