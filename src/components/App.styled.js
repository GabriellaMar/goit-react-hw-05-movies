import styled from "styled-components";

export const StyledContainer = styled.div`
max-width: 1400px;
padding: 15px 50px;

`

export const StyledHeader = styled.header`
.headerList{
    display: flex;
    gap: 20px;
    list-style: none;
    font-size: 25px;
    margin-bottom:30px;

    .NavLink{
        text-decoration: none;
        text-transform: uppercase;
    }
    .NavLink.active{
      color: red;
    }

    
}
`