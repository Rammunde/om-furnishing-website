import { useEffect, useState } from 'react'
import { business, gallery, services, videos } from './config'
import './App.css'

const iconPaths = {
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  play: <path d="m9 6 10 6-10 6z" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
  ),
  youtube: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  facebook: (
    <path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h1.7V1.4A23 23 0 0 0 16.2 1C13.7 1 12 2.5 12 5.3V9H9v4h3v8z" />
  ),
  heart: (
    <path d="M20.8 8.6c0 4.4-8.8 10-8.8 10s-8.8-5.6-8.8-10A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4Z" />
  ),
}

function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-heading${centered ? ' centered' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [formStatus, setFormStatus] = useState('')

  const categories = ['All', ...new Set(gallery.map((item) => item.category))]
  const visibleGallery =
    activeFilter === 'All'
      ? gallery
      : gallery.filter((item) => item.category === activeFilter)
  const whatsappUrl = business.whatsappNumber
    ? `https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
        'Hello, I would like to enquire about your furnishing services.',
      )}`
    : '#contact'
  const youtubeUrl = business.youtubeChannelUrl || '#videos'
  const socialLinks = [
    { label: 'YouTube', url: business.youtubeChannelUrl, icon: 'youtube' },
    { label: 'Instagram', url: business.instagramUrl, icon: 'instagram' },
    { label: 'Facebook', url: business.facebookUrl, icon: 'facebook' },
  ].filter((link) => link.url)

  useEffect(() => {
    if (!selectedImage) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedImage])

  function handleContactSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      `Hello, I'm ${formData.get('name')}.`,
      `My phone number is ${formData.get('phone')}.`,
      formData.get('message'),
    ].join('\n')

    if (business.whatsappNumber) {
      const url = `https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
      window.open(url, '_blank', 'noopener,noreferrer')
      setFormStatus('Your message is ready in WhatsApp. Send it there to complete your enquiry.')
      return
    }

    if (business.email) {
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
        'Furnishing enquiry',
      )}&body=${encodeURIComponent(message)}`
      setFormStatus('Your email draft is ready. Send it to complete your enquiry.')
      return
    }

    setFormStatus(
      'To receive enquiries, add your WhatsApp number or email in src/config.js.',
    )
  }

  return (
    <>
      <div className="announcement">
        <p>Made with care. Made for the way you live.</p>
        <a href="#contact">
          Let&apos;s create your comfort <Icon name="arrow" size={14} />
        </a>
      </div>

      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label={`${business.name} home`}>
            <span className="brand-mark" aria-hidden="true">OM</span>
            <span className="brand-name">
              <strong>OM FURNISHING</strong>
              <small>&amp; SOFA MAKER</small>
            </span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={23} />
          </button>

          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {[
              ['Home', '#home'],
              ['Our story', '#about'],
              ['Services', '#services'],
              ['Lookbook', '#gallery'],
              ['Videos', '#videos'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              Let&apos;s talk <Icon name="arrow" size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2200&q=90"
            alt="A welcoming living room with a beautifully upholstered sofa"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content page-width">
            <span className="hero-kicker"><span /> {business.name}</span>
            <h1 id="hero-title">
              A home that feels
              <br />
              <em>more like you.</em>
            </h1>
            <p>{business.tagline}</p>
            <div className="hero-actions">
              <a className="button button-light" href="#services">
                Explore our collection <Icon name="arrowRight" size={17} />
              </a>
              <a className="button button-outline-light" href="#videos">
                <Icon name="play" size={17} /> Watch our videos
              </a>
              <a className="button button-outline-light" href="#contact">
                Contact us <Icon name="arrowRight" size={17} />
              </a>
            </div>
            <a className="hero-scroll" href="#about">
              <span className="scroll-line" /> A little more about us
            </a>
          </div>
          <div className="hero-note">
            <span className="note-icon"><Icon name="heart" size={19} /></span>
            <span><strong>Comfort, crafted around you</strong><small>From the first idea to the finishing touch</small></span>
          </div>
          <span className="hero-index">01 <i /> 03</span>
        </section>

        <section className="intro-strip" aria-label="Our approach">
          <div className="intro-item"><span>01</span><p>Made to fit your home</p></div>
          <div className="intro-item"><span>02</span><p>Care in every detail</p></div>
          <div className="intro-item"><span>03</span><p>Here for the long run</p></div>
        </section>

        <section className="story-section section-pad" id="about">
          <div className="story-visual">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
              alt="A warm, relaxed living space with natural textures"
              loading="lazy"
            />
            <div className="story-caption"><span>Thoughtful by nature</span><span className="caption-rule" /></div>
            <div className="story-stamp" aria-hidden="true">
              <span>COMFORT</span><b>OM</b><span>CRAFTED</span>
            </div>
          </div>
          <div className="story-copy">
            <SectionHeading
              eyebrow="The OM feeling"
              title={<>Good furniture.<br /><em>Better living.</em></>}
              description="OM Furnishing & Sofa Maker brings sofa making, repair and home furnishing together—so your space feels considered, comfortable and unmistakably yours."
            />
            <p className="story-detail">
              Whether you are starting fresh or giving a much-loved sofa a new chapter,
              we make room for your ideas. Tell us what home means to you, and let&apos;s
              find the right shape, fabric and finish.
            </p>
            <a className="text-link" href="#contact">
              Tell us what you have in mind <Icon name="arrowRight" size={17} />
            </a>
            <div className="story-signoff"><span className="signoff-rule" /> Made for your home, with care</div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="services-top page-width">
            <SectionHeading
              eyebrow="Made for everyday living"
              title={<>A little more <em>comfort.</em></>}
              description="From a brand-new centrepiece to a refresh of the sofa you already love, find the right way to make yourself at home."
            />
            <a className="text-link desktop-link" href="#contact">
              Ask about a project <Icon name="arrowRight" size={17} />
            </a>
          </div>
          <div className="service-grid page-width">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <a className="service-image" href="#contact" aria-label={`Enquire about ${service.title}`}>
                  <img src={service.image} alt={service.alt} loading="lazy" />
                  <span className="service-number">0{index + 1}</span>
                  <span className="image-arrow"><Icon name="arrow" size={18} /></span>
                </a>
                <div className="service-meta"><span>{service.category}</span><span>OM Furnishing</span></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a className="service-link" href="#contact">Enquire about this <Icon name="arrowRight" size={15} /></a>
              </article>
            ))}
          </div>
          <div className="services-foot page-width">
            <p>Looking for L-shape sofas, curtains, cushions or something completely custom?</p>
            <a className="text-link" href="#contact">Let&apos;s talk about it <Icon name="arrowRight" size={16} /></a>
          </div>
        </section>

        <section className="youtube-section section-pad" id="videos">
          <div className="youtube-inner page-width">
            <div className="youtube-copy">
              <span className="eyebrow eyebrow-light">A little behind the making</span>
              <h2>See how comfort<br /><em>comes together.</em></h2>
              <p>
                Take a closer look at sofa making, repairs and ideas for a more
                comfortable home. Follow along as we share new videos.
              </p>
              <a
                className="button button-light"
                href={youtubeUrl}
                target={business.youtubeChannelUrl ? '_blank' : undefined}
                rel={business.youtubeChannelUrl ? 'noreferrer' : undefined}
              >
                <Icon name="youtube" size={19} />
                {business.youtubeChannelUrl ? 'Subscribe on YouTube' : 'YouTube channel coming soon'}
                {business.youtubeChannelUrl && <Icon name="arrow" size={15} />}
              </a>
              {!business.youtubeChannelUrl && (
                <small className="setup-hint">Add your channel link in src/config.js to activate this button.</small>
              )}
            </div>
            <div className="video-shelf">
              {videos.length > 0 ? (
                <div className="video-grid">
                  {videos.slice(0, 2).map((video) => (
                    <article className="video-card" key={video.id}>
                      <div className="video-frame">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                      <span>{video.category}</span>
                      <h3>{video.title}</h3>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="video-empty">
                  <span className="video-empty-icon"><Icon name="play" size={25} /></span>
                  <span className="eyebrow eyebrow-light">The first episode is on its way</span>
                  <p>Your newest sofa-making and furnishing videos will live here.</p>
                  <small>Add real YouTube video IDs to the videos list in src/config.js.</small>
                </div>
              )}
              {business.youtubeChannelUrl && (
                <a className="watch-link" href={business.youtubeChannelUrl} target="_blank" rel="noreferrer">
                  Visit our YouTube channel <Icon name="arrow" size={15} />
                </a>
              )}
            </div>
          </div>
          <div className="youtube-bottom page-width">
            <span>SOFA MAKING</span><i /><span>FURNISHING IDEAS</span><i /><span>THE MAKING OF</span><i /><span>SOFA REPAIR</span>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="gallery-head page-width">
            <SectionHeading
              eyebrow="A lookbook for your home"
              title={<>Find a little <em>inspiration.</em></>}
              description="A collection of spaces and details to spark ideas for your own. Replace these inspiration images with your completed work in src/config.js."
            />
            <div className="gallery-filters" role="group" aria-label="Filter lookbook images">
              {categories.map((category) => (
                <button
                  type="button"
                  className={activeFilter === category ? 'filter-button is-active' : 'filter-button'}
                  key={category}
                  aria-pressed={activeFilter === category}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-grid page-width">
            {visibleGallery.map((item, index) => (
              <button
                type="button"
                className={`gallery-tile gallery-tile-${index + 1}`}
                key={item.title}
                onClick={() => setSelectedImage(item)}
                aria-label={`View ${item.title}`}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="gallery-overlay"><span>{item.category}</span><strong>{item.title}</strong></span>
                <span className="gallery-expand"><Icon name="arrow" size={18} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="promise-section section-pad">
          <div className="promise-inner page-width">
            <div className="promise-heading">
              <span className="eyebrow">The little things matter</span>
              <h2>Why feel at home<br /><em>with OM?</em></h2>
            </div>
            <div className="promise-list">
              <article><span>01</span><div><h3>Your space, your way</h3><p>Choose the shape, size and style that work for the home you have.</p></div></article>
              <article><span>02</span><div><h3>Care beyond the new</h3><p>Repair and renovation can make a favourite feel right again.</p></div></article>
              <article><span>03</span><div><h3>One conversation at a time</h3><p>Talk through your ideas and find a furnishing solution that feels like you.</p></div></article>
            </div>
            <div className="promise-photo">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                alt="A serene living room with natural light and soft neutral furnishings"
                loading="lazy"
              />
              <span>Room to be yourself.</span>
            </div>
          </div>
        </section>

        <section className="reviews-section section-pad" aria-labelledby="reviews-title">
          <div className="reviews-inner page-width">
            <span className="quote-mark" aria-hidden="true">“</span>
            <div>
              <span className="eyebrow">A note from us</span>
              <h2 id="reviews-title">The best part is helping<br /><em>you feel at home.</em></h2>
              <p>We look forward to sharing real customer stories here. Have an OM project you&apos;d like to tell us about?</p>
              <a className="text-link" href="#contact">Share your experience <Icon name="arrowRight" size={16} /></a>
            </div>
            <div className="review-stamp"><span>YOUR HOME</span><b>OM</b><span>YOUR STORY</span></div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-inner page-width">
            <div className="contact-copy">
              <SectionHeading
                eyebrow="Your next chapter starts here"
                title={<>Let&apos;s make room<br /><em>for good things.</em></>}
                description="Tell us what you are looking for. Whether it is a new sofa, a thoughtful repair or a furnishing idea, we would love to hear from you."
              />
              <div className="contact-details">
                <a href={business.phone ? `tel:${business.phone.replace(/\s/g, '')}` : '#contact'}>
                  <span className="contact-icon"><Icon name="phone" size={18} /></span>
                  <span><small>Call us</small><strong>{business.phone || 'Add your phone number'}</strong></span>
                </a>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open our business address in Google Maps"
                >
                  <span className="contact-icon"><Icon name="pin" size={18} /></span>
                  <span><small>Find us</small><strong>{business.address || 'Add your business address'}</strong></span>
                </a>
                <div className="contact-hours">
                  <span className="contact-icon"><span className="hours-dot" /></span>
                  <span><small>Opening hours</small><strong>{business.hours || 'Add your business hours'}</strong></span>
                </div>
              </div>
              <div className="map-card">
                {business.address ? (
                  <iframe
                    title="Map showing OM Furnishing & Sofa Maker"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address)}&output=embed`}
                  />
                ) : (
                  <div className="map-placeholder">
                    <Icon name="pin" size={26} />
                    <span>Your showroom location</span>
                    <small>Add your address in src/config.js to show the map.</small>
                  </div>
                )}
              </div>
              <a className="map-link" href={business.googleMapsUrl} target="_blank" rel="noreferrer">
                Open in Maps <Icon name="arrow" size={14} />
              </a>
              {business.email && <a className="email-link" href={`mailto:${business.email}`}>{business.email}</a>}
            </div>

            <div className="contact-form-card">
              <span className="eyebrow">We&apos;re listening</span>
              <h3>What can we help you with?</h3>
              <p>Leave a few details and we&apos;ll make it easy to get in touch.</p>
              <form onSubmit={handleContactSubmit}>
                <label htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="How should we address you?" required />
                <label htmlFor="contact-phone">Phone number</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="The best number to reach you" required />
                <label htmlFor="contact-message">A little about your project</label>
                <textarea id="contact-message" name="message" rows="4" placeholder="A new sofa, a repair, a fabric you love..." required />
                <button className="button button-dark form-submit" type="submit">
                  Send an enquiry <Icon name="arrowRight" size={17} />
                </button>
                {formStatus && <p className="form-status" role="status">{formStatus}</p>}
                <small className="form-privacy">Your details are only used to respond to your enquiry.</small>
              </form>
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="closing-inner page-width">
            <span className="eyebrow eyebrow-light">Make yourself at home</span>
            <h2>Good things begin<br /><em>with a conversation.</em></h2>
            <a className="button button-light" href="#contact">Start your enquiry <Icon name="arrowRight" size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main page-width">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#home">
              <span className="brand-mark" aria-hidden="true">OM</span>
              <span className="brand-name"><strong>OM FURNISHING</strong><small>&amp; SOFA MAKER</small></span>
            </a>
            <p>Comfort, style and thoughtful furnishing for the place you call home.</p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#about">Our story</a><a href="#services">Services</a><a href="#gallery">Lookbook</a><a href="#videos">Videos</a>
          </div>
          <div className="footer-column">
            <h3>Get in touch</h3>
            <a href="#contact">Contact us</a>
            {business.phone && <a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a>}
            {business.email && <a href={`mailto:${business.email}`}>{business.email}</a>}
            {!business.phone && !business.email && <span className="footer-placeholder">Add contact details in src/config.js</span>}
          </div>
          <div className="footer-column footer-social">
            <h3>Follow along</h3>
            {socialLinks.length > 0 ? socialLinks.map((link) => (
              <a href={link.url} key={link.label} target="_blank" rel="noreferrer">
                <Icon name={link.icon} size={16} /> {link.label} <Icon name="arrow" size={13} />
              </a>
            )) : <span className="footer-placeholder">Add your social links in src/config.js</span>}
          </div>
        </div>
        <div className="footer-bottom page-width">
          <span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span>
          <span>Thoughtful furnishing. Everyday comfort.</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl}
        target={business.whatsappNumber ? '_blank' : undefined}
        rel={business.whatsappNumber ? 'noreferrer' : undefined}
        aria-label={business.whatsappNumber ? 'Chat with us on WhatsApp' : 'Set up WhatsApp contact'}
        title={business.whatsappNumber ? 'Chat on WhatsApp' : 'Add your WhatsApp number in src/config.js'}
      >
        <span className="whatsapp-symbol">WA</span>
      </a>

      {selectedImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={() => setSelectedImage(null)}
        >
          <button className="lightbox-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Close image preview">
            <Icon name="close" size={25} />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selectedImage.image} alt={selectedImage.alt} />
            <figcaption>{selectedImage.title} <span>{selectedImage.category}</span></figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export default App
