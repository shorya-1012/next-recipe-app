import React from 'react'

const Hero = () => {
    return (
        <section className='relative sm:z-0 h-[50vh] lg:h-[80vh]'>
            <div
                style={{ backgroundImage: 'url(https://sulaindianrestaurant.com/wp-content/uploads/2021/01/dine-out-vancouver-2021-scaled.jpg)' }}
                className='main-image h-full w-[100vw] bg-cover bg-no-repeat bg-center' >
                <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
                    <span className="text-white text-4xl w-1/2 text-center font-righteous">Cooking Made Deliciously Simple.</span>
                </div>
            </div>
        </section>
    )
}

export default Hero
