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
    const [century, setCentury] = useState(0) // store century to filter artworks
    const [loading, setLoading] = useState(false); // Track loading state


    useEffect(() => {
        const fetchArt = async () => {
            setLoading(true); // Set loading to true when starting the request
            try {
                const response = await apiClient.get(`/art/search/?keys=*&image_orientation=landscape&filters=[has_image:true],[public_domain:true]&offset=${offset}&rows=50`);
                
                let fetchedArt = response.data.items;
    
                // Apply century filter if a century is selected
                if (century !== 0) {
                    fetchedArt = fetchedArt.filter((piece) => {
                        const period = piece.production_date[0].period;
                        const [startYearString, endYearString] = period.includes('-') ? period.split('-') : [period, period];
                        const startYear = parseInt(startYearString.trim(), 10);
                        const endYear = endYearString ? parseInt(endYearString.trim(), 10) : startYear;
    
                        // Check if the artwork falls within the century
                        return (startYear >= century && startYear < century + 100) || 
                               (endYear >= century && endYear < century + 100);
                    });
                }
    
                // Append or replace artworks based on offset
                if (offset === 0) {
                    setArt(fetchedArt); // Replace the artworks on the first fetch or when resetting
                } else {
                    setArt((prevArt) => [...prevArt, ...fetchedArt]); // Append new artworks
                }
            } 
            catch (error) {
                setError(error.message);
            } 
            finally {
                setLoading(false); // Set loading to false after the request finishes
            }
        };
    
        fetchArt();
    }, [offset, century]); // Fetch art when offset or century changes

    // if i click the button more art, there should be a new fetch with +30 offset

    const getMoreArt = () => {
        if (!loading) {
            setOffset(prevOffset => prevOffset + 30); // Increase the offset by 30
        }
    }


    // a new fetch should happen and the array should be filtered before rendering it


    const getCentury = (century) => {
        if (!loading) {
            setArt([]);  // Clear the previous art array
            setOffset(0); // Reset the offset
            setCentury(century); // Update the selected century, triggering a new fetch
        }
    };

    return (

        <div className="navAndGrid">
            <Accordion className="accordion">
               
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
