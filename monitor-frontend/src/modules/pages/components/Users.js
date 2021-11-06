import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckedUsers from "./CheckedUsers";
import database from '../../../database'
import UncheckedUsers from "./UncheckedUsers";

const Box = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:start;
    align-items:center;
    padding-top:10px;
`; 

const Nav = styled.div`
    display:flex;
    width:80%;
`

const Button = styled.div`
    padding: 5px 10px;
    background-color:${({selected, theme}) => selected ? theme.p_light : "white"};
    flex-grow:1;
    color:${({selected, theme}) => selected ? theme.p_dark : "black"};
    border-radius:10px 10px 0px 0px;
    &:hover {
        cursor:pointer;
    }
`

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        database.getUserList(setUsers, console.error);
    }, []);
    useEffect(() => {console.log(users)}, [users])
    const [checkedList, setCheckedList] = useState(false)
    return <Box>
        <Nav>
            <Button left selected={checkedList} onClick={() => {setCheckedList(true)}}>Admited Users</Button>
            <Button left={false} selected={!checkedList} onClick={() => {setCheckedList(false)}}>Unconfirmed Users</Button>
        </Nav>{
            checkedList ?       
                <CheckedUsers users={users} setUsers={setUsers} />
                : <UncheckedUsers users={users} setUsers={setUsers}  />
        }
    </Box>
}

export default Users;