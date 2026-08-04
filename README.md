# Founders Day Out — Chennai | Edition 2

A responsive landing page for Chennai Events Hub, built with HTML5, CSS3, vanilla JavaScript, GSAP, AOS, and Swiper.js.

## Run it

Open `index.html` in a modern browser. All libraries load from trusted CDNs, so an internet connection is needed for the animations, fonts, and gallery images.

## Event details

- Sunday, 16 August 2026
- Chennai (venue shared with confirmed guests)
- Invite only · 15 seats
- ₹1499, including food and refreshments

The RSVP form presently provides an on-page confirmation; connect it to your preferred form handler or backend before publishing.

## Payment pages

- `payment.html` opens the configured Razorpay Payment Link.
- `payment-success.html` contains the WhatsApp group button for confirmed guests.

After publishing the website, configure Razorpay to redirect successful payments to `https://your-domain.com/payment-success.html`. Payment status should be verified on a server before treating a guest as confirmed.
