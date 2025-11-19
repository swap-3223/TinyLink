import express from 'express'
import { createLink, deleteLink, getAllLinks, getLinkByCode} from '../controllers/LinksController.js'

const router = express.Router()

router.post('/',createLink)

router.get('/',getAllLinks)

router.get('/:code',getLinkByCode)

router.delete('/:code',deleteLink)

export default router