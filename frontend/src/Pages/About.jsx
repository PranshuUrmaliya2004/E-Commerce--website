import React from 'react'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import NewsletterBox from '../Components/NewsletterBox'
const About = () => {
  return (
   < div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title  text1={'About'} text2={'US'} />

</div>
<div className='my-10 flex flex-col md:flex-row gap-16'>
  
  <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
  <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
  <p> Forever was created with a passion to deliver high-quality products
      that blend modern design with everyday comfort. Our goal is to make
      shopping simple, reliable, and enjoyable for everyone. </p>
  <p> We believe in transparency, customer satisfaction, and continuous
      innovation. Each product is carefully selected to ensure durability,
      style, and value for money.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>
        Our mission at Forever is to provide high-quality, stylish, and affordable
  products that enhance everyday life. We are committed to delivering
  exceptional customer experiences through innovation, trust, and excellence.
      </p>
</div>
</div>
<div className=' text-xl py-4' >
  <Title text1={'WHY'} text2={'CHOOSE US'} />
 
 <div className='flex flex-col md:flex-row text-sm mb-20'>
 <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
       <b>Quality Assurance :</b>
       <p className='text-gray-600'>we meticulosly select and vet each product to ensure it meets our stringet Quality Standard.</p>
      

 </div>
 <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
       <b>Convenience  :</b>
       <p className='text-gray-600'>we meticulosly select and vet each product to ensure it meets our stringet Quality Standard.</p>
      

 </div>
 <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
       <b>Exception Customer Service:</b>
       <p className='text-gray-600'>our team is dedicated  professionals is here to assist you the wa,insuring your satisfaction is always first  top Priority.</p>
      

 </div>

 </div>


</div>
    <NewsletterBox/>
    </div>


  )
}

export default About