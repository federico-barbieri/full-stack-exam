import apiClient from "../services/apiClient";
import {useState, useEffect} from "react";
import './Grid.css';
import ArtCard from "./ArtCard";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link } from "react-router-dom";



const Grid = () => {

    const [art, setArt] = useState([]) // store art array
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0); // load more art
    const [technique, setTechnique] = useState("") // store technique used by artist
    const [century, setCentury] = useState(0) // store century to filter artworks
    const [loading, setLoading] = useState(false); // Track loading state


    useEffect(() => {
        const fetchArt = async () => {
            setLoading(true); // Set loading to true when starting the request
            try {
                const response = await apiClient.get(`/art/search/?keys=*&image_orientation=landscape&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=${offset}&rows=30`);
                
                // Only append new art if no filtering is applied
                if (!technique && !century) {
                    setArt(prevArt => [...prevArt, ...response.data.items]); // Append new art
                } else {
                    setArt(response.data.items); // Replace with new data if filtering
                }
    
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



    const getMoreArt = () => {
        if (!loading) {
            setOffset(prevOffset => prevOffset + 10); // Increase the offset by 30
        }
    }

    const getTechnique = (technique) => {
        if (!loading) {
            setTechnique(technique);
            const filteredArt = art.filter((piece) => piece.techniques[0] === technique)
            setArt(filteredArt); // store the technique the user picked
            setOffset(0); // reset the offset to 0
        }
    }

    const getCentury = (century) => {
        if (!loading) {
            setCentury(century);
            const filteredArt = art.filter((piece) => {
                const period = piece.production_date[0].period;
                const yearString = period.includes('-') ? period.split('-')[0] : period;
                const year = parseInt(yearString.trim(), 10);
                return year >= century && year < century + 100;
            });
            
            setArt([]);  // Clear the previous art array
            setTimeout(() => setArt(filteredArt), 0); // Set filtered artworks after clearing
            
            setOffset(0); // Reset the offset
            console.log(filteredArt);
        }
    };

    return (

        <div className="navAndGrid">
            <Accordion className="accordion">
                <AccordionItem>
                    
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                        Filter by technique
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    
                    <AccordionPanel pb={4} >
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} onClick={() => getTechnique("Tempera på pap")} _hover={{color: 'red'}}>
                        Tempera på pap
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} onClick={() => getTechnique("Olie på lærred")} _hover={{color: 'red'}}>
                        Olie på lærred
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} onClick={() => getTechnique("Olie på papir monteret på lærred")} _hover={{color: 'red'}}>
                        Olie på papir monteret på lærred
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
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} _hover={{color: 'red'}}>
                        Chagal
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} _hover={{color: 'red'}}>
                        Modigliani
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' pb={3} _hover={{color: 'red'}}>
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
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' onClick={() => getCentury(1500)} pb={3} _hover={{color: 'red'}}>
                        1500's
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' onClick={() => getCentury(1600)} pb={3} _hover={{color: 'red'}}>
                        1600's
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' onClick={() => getCentury(1700)} pb={3} _hover={{color: 'red'}}>
                        1700's
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' onClick={() => getCentury(1800)} pb={3} _hover={{color: 'red'}}>
                        1800's
                    </Box>
                    <Box style={{cursor: "pointer"}} as='h3' flex='1' textAlign='left' onClick={() => getCentury(1900)} pb={3} _hover={{color: 'red'}}>
                        1900's
                    </Box>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>

            <div className="cardGrid">
                <ul>
                    {art.map((artItem) => (
                        <li key={artItem.id + Math.floor(Math.random() * 1000)}>
                            <Link to={`/art/${artItem.object_number}`}>
                                <ArtCard 
                                    titles={artItem.titles} 
                                    artist={artItem.artist} 
                                    image_thumbnail={artItem.image_thumbnail}
                                    materials={artItem.materials}
                                    techniques={artItem.techniques}
                                    colors={artItem.colors}
                                    production_date={artItem.production_date[0].period}
                                />
                            </Link>
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
