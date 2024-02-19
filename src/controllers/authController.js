const authService = require("../services/authService"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//boobs


const register = async(req,res) =>{
    try{
        const testUsername = "ligma";
        const testEmail = "abraham@chapman.edu"
        const testPassword = "abc";
        const testName = "Nort";

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);

        const documentInfo = {
            username: testUsername,
            email: testEmail,
            password: hashedPassword,
            name: testName,
        }
        //getUserByUsernameOrEmail if it doens't exist then create
        const userDocument = await authService.getUserByUsernameOrEmail(testUsername, testEmail);
        if (userDocument.length){
            console.log("User already been registered");
            return res.status(409).json("User already been registered");
        }
        //create user
        await authService.createUser('users', documentInfo, testEmail, testUsername); 
        console.log("New user has been registered");
        console.log(documentInfo);
        return res.status(200).json("User has been registered");
    }
    catch(err){
        return res.status(500).json(err);
    }
}


const login = async(req,res) =>{
    try{
        //check username and email for its corresponding account
        const testUsername = 'ligma';
        const testEmail = "kevhuang@chapman.edu";
        const testPassword = "abc";

        const userDocument = await authService.getUserByUsernameOrEmail(testUsername, testEmail); //array of all documents that have this is returned, but since it's always a single user/document, array[0] is needed
        console.log(`Controller: ${userDocument[0]}, userDocument length: ${userDocument.length}`);

        console.log(userDocument.length);
        console.log(userDocument[0].password);

        if (userDocument.length === 0){
            return res.status(404).json("User not found");
        }

        //if exists, test the password entry for account
        const checkPassword = bcrypt.compareSync(testPassword, userDocument[0].password);
        console.log(checkPassword);
        if (!checkPassword) {
            return res.status(401).json("Incorrect Password");
        }

        console.log(`Logging In ${testEmail}`);
        const token = jwt.sign({id:userDocument[0]._id}, "secretkey");
        const {password, ...others} = userDocument[0];
        res.cookie("accessToken", token, { httpOnly: true });
        return res.status(200).json("Logged in successfully");
    }
    catch(err){
        return res.status(500).json(err);
    }
    
}

const logout = async(req,res) =>{
    const testUsername = 'Kevin122402';
    const testEmail = "kevhuang@chapman.edu"
    const userDocument = await authService.getUserByUsernameOrEmail(testUsername, testEmail);
    console.log(`Controller: ${userDocument}`);
}

module.exports = {
    login,
    register,
    logout
}

