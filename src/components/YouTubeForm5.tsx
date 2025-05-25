
// Video -> React Hook Form Tutorial - 9 - Display Error Messages
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';


type FormValues = {
    username: string,
    email: string,
    channel: string,
}

export const YouTubeForm5 = () => {

    const form = useForm<FormValues>();
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
                    })} />
                    <p className="error">{errors.username?.message}</p>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' {...register('email', {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email format'
                        },
                        required: "Email is required"
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
                <button className="mt-4 bg-amber-700 border-amber-400 w-20 h-10 rounded-2xl">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
} 