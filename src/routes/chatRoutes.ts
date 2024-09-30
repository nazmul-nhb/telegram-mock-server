import express, { Router } from 'express';
import {
	createChat,
	deleteChat,
	getChat,
	getChats,
	updateChat,
} from '../controllers/chatControllers';

const router: Router = express.Router();

router.post('/', createChat);
router.get('/', getChats);
router.get('/:id', getChat);
router.patch('/:id', updateChat);
router.delete('/:id', deleteChat);

export default router;
