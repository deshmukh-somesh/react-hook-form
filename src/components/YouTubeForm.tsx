

export const YouTubeForm = () => {
    return (
        <div>
            <form className="flex flex-col items-center">
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' />

                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' />

                <label htmlFor='channel'>Channel</label>
                <input type='text' id='channel' name='channel' />

                <button className="mt-4 bg-amber-700 border-amber-400 w-20 h-10 rounded-2xl">Submit</button>
            </form>
        </div>
    )
} 