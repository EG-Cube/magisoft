import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users, sortCriteria }) => {
  return (
    <>
      {users?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </>
  );
};

export default UserList;
