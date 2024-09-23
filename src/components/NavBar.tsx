import { Stack, Image } from '@chakra-ui/react'
import smkLogo from "../assets/logo/smk_logo_black.png"

const NavBar = () => {
    return (
        <Stack direction="row">
            <Image
            src={smkLogo}
            alt="SMK logo"
            boxSize='150px'
            objectFit='contain'
            style={{padding: 1 + "rem"}}
            />

        </Stack>
    
    )
}

export default NavBar;