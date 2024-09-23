import apiClient from "../services/apiClient";
import {useState, useEffect} from "react";
import './Grid.css';
import ArtCard from "./ArtCard";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'


const Grid = () => {

    const [art, setArt] = useState([])
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false); // Track loading state


    const getMoreArt = () => {
        if (!loading) {
            setOffset(prevOffset => prevOffset + 30); // Increase the offset by 30
        }
    }

    useEffect(() => {
        const fetchArt = async () => {
            setLoading(true); // Set loading to true when starting the request
            try {
                const response = await apiClient.get(`/art/search/?keys=*&image_orientation=portrait&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=${offset}&rows=30`);
                setArt(prevArt => [...prevArt, ...response.data.items]);
                console.log(response.data.items);
            } 
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false); // Set loading to false after the request finishes
            }
        };

        fetchArt();
    }, [offset]);

    return (

        <div className="navAndGrid">
            <Accordion width="20%">
                <AccordionItem>
                    
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by genre
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    
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
                    
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by artist
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    
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
                    
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by century
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    
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
                        <li key={artItem.id + Math.floor(Math.random() * 1000)}>
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
                <Button isDisabled={loading} onClick={getMoreArt} colorScheme='blackAlpha' m={10} p={2}>More art</Button>
                
            </div>
        </div>
    )
};

export default Grid;
