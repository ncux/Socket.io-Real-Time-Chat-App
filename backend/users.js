let users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // check if user is already in the room
    const user = users.find(user => user.room == room && user.name == name);
    if(user) {
        return { error: 'User is already logged in' };
    }
    const newUser = { id, name, room };
    users.unshift(newUser);
    return { newUser };
};

const removeUser = id => {
    return users = users.filter(user => user.id !== id);
}

const getUser = id => users.find(user => user.id == id);

const getUsersInRoom = room => users.filter(user => user.room == room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
