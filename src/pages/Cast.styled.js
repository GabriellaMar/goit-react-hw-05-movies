import styled from "styled-components";


export const StyledCastList = styled.ul`

display: flex;
flex-wrap: wrap;
gap: 20px; 
min-width: 250px;
list-style: none;


.castItem{
    width: 200px;
}

.noImageContainer{
    width:200px;
    height: 300px;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
}
`
export const StyledCastTittle = styled.h3`
font-weigth: 500;`