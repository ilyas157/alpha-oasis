import Testimonials from "../models/Testimonials.js";

export const getTestimonials = async (req, res) => {
  try {
    let sort = {};
    if (req.query.sort) {
      const [field, order] = JSON.parse(req.query.sort);
      sort[field] = order === 'ASC' ? 1 : -1;
    }
    const testimonials = await Testimonials.find().sort(sort);
    if (!testimonials) res.status(404).json({ error: 'Testimonials not found' });
    const data = testimonials.map((m) => ({
      ...m.toObject(),
      id: m._id.toString(),
    }));
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', `testimonials 0-${data.length - 1}/${data.length}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};


export const sendTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonials.create(req.body);
    if (!testimonials) res.status(400).json({ error: 'failed to send testimonials ' });
    const data = { ...testimonials.toObject(), id: testimonials._id.toString() };
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to send testimonial' });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if (!testimonial) res.status(404).json({ error: "Testimonial doesn't exist" });
    const data = { ...testimonial.toObject(), id: testimonial._id.toString() };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get this testimonial' });
  }
};

export const deleteTestimonials = async (req, res) => {
  try {
    const deleted = await Testimonials.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};

export const updateTestimonials = async (req, res) => {
  try {
    const updated = await Testimonials.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
}
