
import { useForm, useFieldArray } from 'react-hook-form';

// Fix 1: Correct the type to match your form structure
type FormValues = {
    users: {
        name: string;
        email: string;
    }[];
}

export  function BasicFieldArrayExample() {
    const { control, handleSubmit, register } = useForm<FormValues>({
        defaultValues: {
            users: [{ name: "", email: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "users"
    });

    // Fix 2: Use the correct type for onSubmit
    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className='max-w-md mx-auto p-6'>
            <h2 className="text-2xl font-bold mb-4">User Registration</h2>

            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">
                                User {index + 1}
                            </h3>
                            {fields.length > 1 && (
                                <button
                                    type='button'
                                    onClick={() => remove(index)}
                                    className='text-red-600 hover:text-red-800 font-bold'
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        <div className='space-y-2'>
                            <input
                                {...register(`users.${index}.name`, { required: true })}
                                placeholder='Name'
                                type='text'
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />

                            {/* Fix 3: This should register email, not name again */}
                            <input
                                {...register(`users.${index}.email`, { required: true })}
                                placeholder='Email'
                                type='email'
                                className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>
                    </div>
                ))}
                
                <button
                    type='button'
                    onClick={() => append({ name: "", email: "" })}
                    className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                    Add User
                </button>
                
                <button
                    type='button'
                    onClick={handleSubmit(onSubmit)}
                    className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}