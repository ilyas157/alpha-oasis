import { Router } from 'express';

import {
  sendMessage,
  getMessageById,
  getMessages,
  deleteMessage,
} from '../controllers/messagesController.js';


const router = Router();
router.get('/messages', getMessages);
router.get('/messages/:id', getMessageById);
router.post('/messages', sendMessage);
router.delete('/messages/:id', deleteMessage);
export default router;



