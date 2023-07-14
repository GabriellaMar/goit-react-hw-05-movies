import styled from "styled-components";

export const StyledLinkList = styled.ul`
display: flex;
list-style: none ;
gap: 20px;

.NavLink{
  font-weight: 700;
        text-decoration: none;
        letter-spacing: 2px;
    }
.NavLink.active{ 
      color: red;
    }
`
export const StyledSubtittle = styled.h2`
font-weight: 700;
    font-size: 20px;
`

export const StyledContainer = styled.div`
/* display: flex; */

.info-tittle {
    font-weight: 700;
    font-size: 25px;
    margin-top: 60px;
  }
  /* .icon-container{
    display: flex;
    gap:4px;
    align-items:center;
    /* justify-content: center; */

  .goBackLink{
    display:flex;
    /* align-items:center; */
    gap: 7px;
    font-size:20px;
    margin-bottom: 25px;
    text-decoration: none;
  }
  .goBackLink:hover{
    color: red;
  }

  .goBackImg:hover{
    color: red;
  }
`

// export const StyledTitle = styled.h1`
// font-size: 48px;
//   font-weight: 300;
//   letter-spacing: 2px;
// `
export const StyledImg = styled.img`
width: 350px;
`