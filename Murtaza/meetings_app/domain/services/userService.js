const UserModel = require('../../infrastructure/models/User');

const createUserIfNotExists = async userDomainEntity => {

    let alreadyExistingUserWithIncomingEmailAddress = await UserModel.find({emailAddress: userDomainEntity.emailAddress});
    let alreadyExistingUserWithIncomingUsername = await UserModel.find({username: userDomainEntity.username});

    
    if (alreadyExistingUserWithIncomingEmailAddress.length > 0)
        return {data: userDomainEntity.emailAddress, message: "Email Address already Exists"};

    if (alreadyExistingUserWithIncomingUsername.length > 0) 
        return {data: userDomainEntity.emailAddress, message: "Username already taken"};

    const user = new UserModel();
    user.firstName = userDomainEntity.firstName;
    user.lastName = userDomainEntity.lastName;
    user.emailAddress = userDomainEntity.emailAddress;
    user.username = userDomainEntity.username;
    user.setPassword(userDomainEntity.password);
    user.bio = userDomainEntity.bio;

    return await user.save().then(function(){
        return {data: user.toJSON(), cookie: user.generateJWT(), message: "User created succesfully"};
    }).catch(err => {
        throw err;
    });  
}

const authenticateUser = async (username, password) => {
    const user = await findUserByUsername(username);
    if (user.isPasswordValid(password)) {
        return {isLoggedin: true, cookie: user.generateJWT(), message: "User logged in succesfully"};
    } else {
        return {isLoggedin: false, message: "Invalid Credentials, please try again"};
    }
}

const findUserByUsername = async (username) => {
    const user = await UserModel.findOne({username: username});
    if (user)
        return user;
    else
        throw err;
} 

module.exports = {
    createUserIfNotExists: createUserIfNotExists,
    authenticateUser: authenticateUser
}
