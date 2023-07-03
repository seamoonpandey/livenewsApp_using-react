import React from 'react'
import loading from '../cool-loading-animated-gif-3.gif'

const Loading = () => {
    return (
        <div className='text-center'>
            <img src={loading} alt='loading' />
        </div>
    )
}

export default Loading