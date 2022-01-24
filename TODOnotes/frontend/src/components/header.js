import styled from 'styled-components';
import React from "react";
import {Link} from 'react-router-dom';

export const Box = styled.div`
padding: 20px 10px;
background: LightSteelBlue;
position: middle;
bottom: 0;
width: 100%;
@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const HeaderLink = styled.a`
color: black;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;
&:hover {
	color: purple;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 18px;
color: #fff;
margin-bottom: 40px;
font-weight: bold;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
grid-gap: 30px;
`;

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 40px;
`;


const Header = () => {
return (
	<Box>
		<Container>
        <Row>
            <Column>
                <Link to="/">Пользователи</Link>
            </Column>
            <Column>
                <Link to="/projects">Проекты</Link>
            </Column>
            <Column>
                <Link to="/todo">Список заданий</Link>
            </Column>
            <Column>
                {this.is_auth() ? <button onClick={() => this.logout()}>Выход</button> : <button onClick='document.location="/login"'>Вход</button>}
            </Column>
        </Row>
      </Container>
	</Box>
);
};
export default Header;