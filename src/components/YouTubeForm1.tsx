import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';


export const YouTubeForm1 = () => {

    const form = useForm();

    const { register, control } = form;

    return (
        <div>
            <form className="flex flex-col items-center">
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username'  {...register("username")} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email'  {...register("email")} />
                </div>
                <div>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel'  {...register("channel")} />
                </div>
                <button className="mt-4 bg-amber-700 border-amber-400 w-20 h-10 rounded-2xl">Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
} 