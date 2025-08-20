import mongoose from 'mongoose';

const TestimonialScheme = new mongoose.Schema({
  user: { type: String, require: true },
  src: String,
  time: String,
  titre: String,
  stars: String,
  avis: String,
});

const Testimonials = mongoose.model('Testimonials', TestimonialScheme);
export default Testimonials;