import styled from 'styled-components';
import React from "react";

export const Box = styled.div`
padding: 20px 40px;
background: LightSteelBlue;
position: absolute;
bottom: 0;
width: 100%;
`;

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "black",
				textAlign: "center",
				marginTop: "15px" }}>
		Все права защищены &copy; 2021
	</h1>
	</Box>
);
};
export default Footer;
