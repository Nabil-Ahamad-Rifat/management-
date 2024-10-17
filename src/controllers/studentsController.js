import { loginService, UpdateService, profileReadService, registerService } from './../services/studentService.js';

// Register service
export const register = async (req, res) => {
    let result = await registerService(req)
    return res.json(result);
}


// Login Service
export const login = async (req, res) => {
    let result = await loginService(req, res)
    return res.json(result);
}


// profileRead service
export const profileRead = async (req, res) => {
    let result = await profileReadService(req)
    return res.json(result);
}


// Update service
export const Update =async(req,res)=>{
    let result=await UpdateService(req,res)
    return res.json(result)
}

