import { Router } from "express";
import { createUser, getAllUser, getUserById, updateUserSingleDetail, updateUserDetails, deleteUserDetail } from "../controller/userController";


const router = Router();


router.get('/users', getAllUser);
router.get('/users/:user_id', getUserById);
router.post('/createuser', createUser);
router.put('/users/update/:user_id', updateUserDetails);
router.patch('/update/:user_id', updateUserSingleDetail);
router.delete('/delete/:user_id', deleteUserDetail);


export default router;