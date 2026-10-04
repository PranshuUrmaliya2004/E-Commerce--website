import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const HeroBanner = () => (
  <section className='season-hero season-hero--bleed' aria-label='Shopnex new season collection'>
    <img
      className='season-hero__image'
      src={assets.hero_img}
      alt='Model wearing a dramatic black scarf from the new season collection'
    />
    <div className='season-hero__copy'>
      <p className='season-hero__eyebrow'>SHOPNEX / THE NEW SEASON</p>
      <h1>Made to be <em>remembered.</em></h1>
      <p className='season-hero__description'>Considered pieces. Distinctive details. A new point of view on everyday dressing.</p>
      <Link className='season-hero__link' to='/collection'>
        Explore the collection <span aria-hidden='true'>↗</span>
      </Link>
    </div>
    <p className='season-hero__edition'>COLLECTION 01 <span>—</span> 2026</p>
  </section>
)

export default HeroBanner