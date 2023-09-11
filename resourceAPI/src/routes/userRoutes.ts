import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUserSingleDetail, updateUserDetails, deleteUserDetail } from "../controller/userController";


const router = Router();


router.post('/', createUser);
router.get('/alluser/:user_id', getUserById);
router.get('/alluser', getAllUser);
router.patch('/:user_id', updateUserSingleDetail);
router.put('/:user_id', updateUserDetails);
router.delete('/:user_id', deleteUserDetail);


export default router;