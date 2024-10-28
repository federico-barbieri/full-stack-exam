import { Stack, Image } from '@chakra-ui/react'
import smkLogo from "../assets/logo/smk_logo_black.png"
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Stack direction="row">
            <Link to={"/"}>
            <Image
            src={smkLogo}
            alt="SMK logo"
            boxSize='150px'
            objectFit='contain'
            style={{padding: 1 + "rem"}}
            />
            </Link>

        </Stack>
    
    )
}

export default NavBar;