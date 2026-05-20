import { Router } from "express"

// /chats
const router = Router()

router.get('/', (req, res) => { 
    res.render('chats');
})

router.get('/:id', (req, res) => { 
    
    res.render('chats');

})


export default router;






