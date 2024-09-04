import React from 'react'
import "./Header.scss";
import { Container, Grid, Image } from 'semantic-ui-react';
import Logo from "../../assets/png/instaclone.png";
import { Link } from 'react-router-dom';
import RightHeader from './RightHeader/RightHeader';


export default function Header() {
  return (
    <div className='header'>
        <Container>
            <Grid>
                <Grid.Column width={3} className='header__logo' >
                    <Link to="/">

                    <Image src={Logo} alt="Instaclone"  />

                    </Link>
                </Grid.Column>
                <Grid.Column width={10}  >
                    <p>Buscador</p>
                </Grid.Column>

                <Grid.Column width={3}  >
                    <RightHeader></RightHeader>
                </Grid.Column>
            </Grid>
        </Container>
    </div>
  )
}
