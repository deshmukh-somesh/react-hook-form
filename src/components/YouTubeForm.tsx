import { useForm } from 'react-hook-form';



export const YouTubeForm = () => {

    const form = useForm();

    const { register } = form;
    // const { name, ref, onChange, onBlur } = register("username"); -> verbose way
    return (
        <div>
            <form className="flex flex-col items-center">
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='email' id='email'  {...register("username")} />
                    {/* <input type='text' id='username' name={name} ref={ref} onChange={onChange} onBlur={onBlur} /> -> verbose way not recommanded. */}
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
        </div>
    )
} 