import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const EtherealBeautyBody = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* About Section */}
      <section className="bg-white text-black p-8 rounded-lg shadow-xl mb-16">
        <h2 className="text-3xl font-semibold mb-6">About Us</h2>
        <p className="text-lg mb-4">
          At *Ethereal Beauty*, we believe that beauty is a reflection of inner health and self-love. 
          We offer a wide range of high-quality beauty products, crafted with natural ingredients to enhance your natural glow.
        </p>
        <p className="text-lg">
          Our mission is to empower individuals to embrace their unique beauty, providing products that are gentle, effective, and ethically sourced. We are committed to offering a wide range of skincare essentials that cater to different skin types, ensuring 
          everyone can achieve their best skin health effortlessly.
        </p>
      </section>

      {/* Services Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Find your Skin Type</h2>
        <p className="text-lg mb-4 text-center">
          Understanding your skin type is the first step toward an effective skincare routine. Discover which products suit you best!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Oily Skin</h3>
            <p>Lightweight, oil-free formulas to keep shine under control.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Dry Skin</h3>
            <p>Intensely hydrating products to restore moisture balance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Combination Skin</h3>
            <p>Balanced skincare solutions for a harmonious complexion.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Sensitive Skin</h3>
            <p>Gentle, fragrance-free formulas to soothe and protect.</p>
          </div>
        </div>
      </section>

  {/* Our Brands Section */}
  <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Mamaearth</h3>
            <p className="text-sm">Natural and toxin-free skincare products that nourish and protect your skin.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Aqualogica</h3>
            <p className="text-sm">Hydration-focused skincare designed to keep your skin fresh and glowing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Cetaphil</h3>
            <p className="text-sm">Dermatologist-recommended gentle skincare for all skin types.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Dermaco</h3>
            <p className="text-sm">Clinically-backed skincare solutions tailored for various skin concerns.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"The skincare products are amazing! My skin has never felt so soft and radiant."</p>
            <p className="font-semibold">- Sarah L.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"I love the makeup line. It’s perfect for everyday wear and feels so light on my skin!"</p>
            <p className="font-semibold">- Priya S.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <p className="italic mb-4">"The Herbal Shampoo completely transformed my hair. It feels so much healthier now!"</p>
            <p className="font-semibold">- Anita R.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EtherealBeautyBody;
