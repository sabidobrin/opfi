import React, { useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { Table } from "./Table";
import data from '../data/data';

const Users = () => {

    const Container = styled.div`
        text-align: center;
    `

    const Input = styled.input`
        border: 1px solid var(--green);
        padding: 0.5pc;
        margin-top: 1pc;
        border-radius: 0.75pc;
        width: 20pc;
    `

    const columns = useMemo(() => [
        {
            Header: 'User ID',
            accessor: 'userId',
        }, {
            Header: 'First name',
            accessor: 'firstName'
        }, {
            Header: 'Last name',
            accessor: 'lastName'
        }, {
            Header: 'Phone',
            accessor: 'phoneNumber'
        }, {
            Header: 'E-mail',
            accessor: 'emailAddress'
        }
        ], []
    )

    const [clickedRow, setClickedRow] = useState('');
    const writeRow = async (values) => {
        setClickedRow('User ID: ' + values.userId + ', Name: ' + values.firstName + ' ' + values.lastName
            + ', Phone: ' + values.phoneNumber + ', E-mail: ' + values.emailAddress);
    }
    const deleteRow = () => {
        setClickedRow('');
    }

    const [inputValue, setInputValue] = useState('');
    const onFilterChange = (e) => {
        setInputValue(e.target.value);
    }
    const filter = (inputValue, items) => {
        const filtered = items.filter(item => {
            return item.firstName.toLowerCase().includes(inputValue.toLowerCase())
                || item.lastName.toLowerCase().includes(inputValue.toLowerCase())
                || item.emailAddress.toLowerCase().includes(inputValue.toLowerCase())
                || item.phoneNumber.includes(inputValue)
                || item.userId === Number(inputValue);
        });
        return filtered;
    }
    
    useEffect(() => {
        document.getElementById("inputValue").focus();
    }, [inputValue]);

    return (
        <Container>
            <Input type="search" id="inputValue" placeholder="Filter ..." value={inputValue} onChange={onFilterChange} />
            <Table columns={columns} data={filter(inputValue, data)} writeRow={writeRow} deleteRow={deleteRow} />
            <span>{clickedRow}</span>
        </Container>
    );
}

export { Users }
