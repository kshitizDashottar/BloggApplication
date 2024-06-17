import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../model/user.js";
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async(request,response)=>{
        try{

            // const salt = await bcrypt.genSalt();

            const hashPassword = await bcrypt.hash(request.body.password,10);
 
            const user = {username: request.body.username , name: request.body.name , password: hashPassword}
            // to validate incoming req from frontend we need to build a Schema

            const newUser = new User(user);

            await newUser.save()
            .then(result => {
                // Successfully saved
              })
              .catch(error => {
                //console.log('yaha main dikkat h');
                // Handle validation errors
                console.error('Validation Error:', error.message);
              });

            return response.status(200).json({msg: 'Signup Successful'})

        }catch(error){
            return response.status(500).json({msg: 'Error while Signup'})
        }
}




export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }
  
    try {
      //comparing password
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            // access token expire ho jata h refresh token is permanent
            // we  can generate access token using refresh token
            // jb bhi naya banda login uska naya refresh token hoga
            //we have to store refresh token somewhere
  
            // refresh token  check krenge database me agar token exist nahi krta
            // toh user login hi nhi kr payega and if refresh token exist krta h usi  case 
            // me access token generate hoga
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save()
            .then(result => {
              // Successfully saved
            })
            .catch(error => {
              //console.log('yaha main dikkat h');
              // Handle validation errors
              console.error('Validation Error:', error.message);
            });
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
           return response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
  }
  

