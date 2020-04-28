export default function(user={}, action){
    if(action.type==='saveUser'){
        let newUser=action.user;
        console.log('newUser :>> ', newUser);
        return newUser;
    } else {
        return user;
    }
}