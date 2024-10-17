import studentModel from "../model/studentModel.js";
import mongoose from "mongoose";
import { EncodeToken } from './../utility/TokenUtility.js';

const ObjectId = mongoose.Types.ObjectId;

export const registerService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await studentModel.create(reqBody);
        return { status: "successfully registration", data: data };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}


export const loginService = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await studentModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 1, email: 1 } },
        ]);

        if (data.length > 0) {
            let token = EncodeToken(data[0]["email"]);

            // Set cookie
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };

            res.cookie("Token", token, options);
            return { status: "successfully login", token: token, data: data[0] };
        } else {
            return { status: "unauthorized", data: data };
        }
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}


export const profileReadService = async (req) => {
    let email = req.headers.email;
    try {
        let MatchStage = {
            $match: {
                email,
            }
        };

        let project = {
            $project: {
                studentID: 1,
                email: 1,
                firstName: 1,
                lastName: 1,
                gender: 1,
                phone: 1,
            }
        }


        let data = await studentModel.aggregate([
            MatchStage,
            project
        ]);


        return { status: "successfully read profile", data: data[0] };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}



export const UpdateService= async (req) => {
    try {
        let email=req.headers.email;
        let reqBody=req.body;
        reqBody.email=email;
      let data =  await studentModel.updateOne({email:email},{$set:reqBody},{$upsert:true})
        return {status:"success", message:"Update Successfully ",data: data}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong",error: e.toString()}
    }

}


