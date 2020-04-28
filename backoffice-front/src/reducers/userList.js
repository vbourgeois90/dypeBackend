export default function(userList=[], action){
    if(action.type==='loadOnInit'){
        let newUserList=action.users;
        return newUserList;
    } else {
        return userList;
    }
}