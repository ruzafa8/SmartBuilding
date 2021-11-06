import React from 'react';
import styled from "styled-components";
import admit from '../../../images/plus.svg';
import trash from '../../../images/trash.svg';
import database from '../../../database'

const Flex = styled.div`
    display:flex;
`; 

const Table = styled(Flex)`
    width:80%;
    flex-direction:column;
    align-items:center;
    border-radius:0px 0px 2px 2px;
`

const Row = styled(Flex)`
    display:flex;
    width:100%;
    background-color:${({theme}) => theme.p_light};
    align-items:center;
    border-style:solid;
    border-color:${({theme}) => theme.p_dark};
    border-width:0px 0px 1px 0px;
    padding:10px 0px;
`

const Data = styled(Flex)`
    flex-grow:1;
`

const Item = styled.div`
    width:${({width}) => width || 0}px;
    overflow: hidden;
`

const StyledButton = styled(Flex)`
    align-items:center;
    background-color: ${({theme}) => theme.primary};
    border-radius:50px;
    padding:10px;
    width:18px;
    transition: width 1s;

    & > img {
        width:17px;
    }
    & > div {
        margin-left:10px;
        width:0px;
        overflow: hidden;
        transition: width 1s;
    }

    &:hover {
        width:75px;
        cursor:pointer;
    }

    &:hover div {
        width:50px;
    }
`

const A = styled.div`
    width:100px;
    color:${({theme}) => theme.p_text};
`
const Button = ({img, children, onClick}) => <A>
    <StyledButton onClick={onClick}>
        <img src={img} />
        <div>{children}</div>
    </StyledButton>
</A>

const CheckedUsers = ({users, setUsers}) => <Table>{
    users.filter(({verified}) => verified).map((user,idx) => <Row key={idx}>
        <Data>
            <Item width="10"></Item>
            <Item width="30">{user.id}</Item>
            <Item width="120">{user.username}</Item>
            <Item width="70">{user.licensePlate}</Item>
        </Data>
        <Button img={admit} onClick={() => database.modifyUser(user.id, false, 
            () =>{setUsers(us => us.map(u => u == user?({...u,verified:false}):u))})}>revoke</Button>
        <Button img={trash} onClick={() => database.deleteUser(user.id, 
            () => {setUsers(us => us.filter(u => u != user))})}>delete</Button>
    </Row>)
}</Table>

export default CheckedUsers;