import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    let sort = {};
    if (req.query.sort) {
      const [field, order] = JSON.parse(req.query.sort);
      sort[field] = order === 'ASC' ? 1 : -1;
    }
    const messages = await Message.find().sort(sort);
    if (!messages) res.status(404).json({ error: 'Messages not found' });
    const data = messages.map((m) => ({
      ...m.toObject(),
      id: m._id.toString(),
    }));
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    res.set('Content-Range', `messages 0-${data.length - 1}/${data.length}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const sent = await Message.create(req.body);
    console.log(req.body);
    if (!sent) res.status(400).json({ error: 'failed to send message' });
    const data = { ...sent.toObject(), id: sent._id.toString() };
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) res.status(404).json({ error: "Message doesn't exist" });
    const data = { ...message.toObject(), id: message._id.toString() };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get this message' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
