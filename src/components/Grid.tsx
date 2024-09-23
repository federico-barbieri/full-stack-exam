import apiClient from "../services/apiClient";
import {useState, useEffect} from "react";
import './Grid.css';
import ArtCard from "./ArtCard";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'



const Grid = () => {

    const [art, setArt] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const response = await apiClient.get("/art/search/?keys=*&image_orientation=portrait&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=30");
                setArt(response.data.items);
                console.log(response.data.items);
            } 
            catch (error) {
                setError(error.message);
            }
        };

        fetchArt();
    }, []);

    return (

        <div className="navAndGrid">
            <Accordion width="20%">
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by genre
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} >
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Modern
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Danish
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Udenlands
                    </Box>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by artist
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} >
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Chagal
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Modigliani
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        Munch
                    </Box>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by century
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} >
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        1500's
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        1600's
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        1700's
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        1800's
                    </Box>
                    <Box as='h3' flex='1' textAlign='left' pb={3}>
                        1900's
                    </Box>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>

            <div className="cardGrid">
                <ul>
                    {art.map((artItem) => (
                        <li key={artItem.id}>
                            <ArtCard 
                                titles={artItem.titles} 
                                artist={artItem.artist} 
                                has_image={artItem.has_image} 
                                image_thumbnail={artItem.image_thumbnail}
                                materials={artItem.materials}
                                techniques={artItem.techniques}
                                colors={artItem.colors}
                            />
                        </li>
                    ))}
                </ul>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    )
};

export default Grid;
