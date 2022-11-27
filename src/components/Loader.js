import React from 'react'

function Loader() {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
          
            <div class="spinner-grow inline-block w-30 h-30 bg-secondary rounded-full opacity-0" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        </div>
    )
}

export default Loader;