import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span><i className="ri-truck-line"></i></span>
            <h4>Home Delivery</h4>
            <p>Offers convinience and the ability to shop from anywhere, anytime.</p>

        </div>
        <div className='banner__card'>
            <span><i className="ri-leaf-line"></i></span>
            <h4>Environment Friendly</h4>
            <p>Promotes sustainability by reducing the carbon footprint and supporting eco-conscious practices.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-verified-badge-line"></i></span>
            <h4>Genuine Products</h4>
            <p>Ensures authenticity and quality, providing peace of mind with every purchase.</p>        </div>
    </section>
  )
}

export default PromoBanner