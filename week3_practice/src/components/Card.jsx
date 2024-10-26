import styled from "@emotion/styled";
import { useState } from "react";

const Card = ({member}) => {
    const[like, setLike] = useState(0);

    const {name, englishname, github} = member;
    const handleClickButton = () => {
        setLike((prev) => prev +1);
    };
    
    return <CardContainer>
        <NameWrapper>{name}</NameWrapper>
        <span>{englishname}</span>
        <span>{github}</span>
        <p>{`좋아요 수: ${like}`}</p>
        <ButtonWrapper onClick={handleClickButton}>좋아요</ButtonWrapper>
    </CardContainer>;
        
};


export default Card;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;

    width: 15rem;
    height: 10rem;

`;

const ButtonWrapper =  styled.button`
border: 2px solid black;
border-radius: 10px;
display: flex;
flex-direction: row;
`;

const NameWrapper = styled.span`
font-weight: 700;
font-size: 1.2rem;
`;
