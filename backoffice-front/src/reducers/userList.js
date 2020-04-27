export default function(userList=[], action){
    if(action.type==='loadOnInit'){
        let newUserList=action.users;
        console.log('newUserList :>> ', newUserList);
        return newUserList;
    } else {
        return userList;
    }
}