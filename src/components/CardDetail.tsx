import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import { Card, CardBody, Heading, Image, Text, Flex, Box } from '@chakra-ui/react'
import "./CardDetail.css";


const CardDetail = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [artDetail, setArtDetail] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchArtDetail = async () => {
            try {
                const response = await apiClient.get(`/art?object_number=${id}`);  // Fetch art details by ID
                console.log("api response:", response.data)
                
                setArtDetail(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchArtDetail();
    }, [id]); // Run the effect whenever the ID changes

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!artDetail) return <p>Loading...</p>;

    const { titles, artist, image_thumbnail, techniques, materials, colors } = artDetail.items[0];

    const getColors = colors && Array.isArray(colors) ? colors.map((color) => (
        <span
            key={color}
            style={{
                backgroundColor: color,
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                margin: '0 5px'
            }}
        ></span>
    )) : null;

    const gradientBackground = colors && Array.isArray(colors)
    ? colors.map(color => `linear-gradient(45deg, ${color}, rgba(255, 255, 255, 0.1))`).join(", ")
    : "white";


    return (
        <div 
        className="cardDetailPage"
        >
            <Card
            style={{ backgroundImage: gradientBackground, backgroundSize: 'cover', padding: '2rem', mixBlendMode: 'multiply' }}
            direction="row"  // Flex direction for the entire Card
            overflow='hidden'
            variant='outline'
            alignItems="center"  // Align image and text vertically in the center
            justifyContent="center"  // Align image and text horizontally in the center
            p={1}
            m={1}
            bg="white"  // Card should still have a white background to contrast with the gradient
            boxShadow="lg"  // Add a nice shadow for effect
            >
                <CardBody>
                    <Flex direction="row" align="center" justify="center" wrap="wrap">
                        <Box flex="1" mr={5}>
                            {/* Text and information about the art */}
                            <Heading size='md'>{titles && titles.length > 0 ? titles[0].title : "Untitled"}</Heading>
                            <Heading size='sm'>{artist || "Unknown Artist"}</Heading>
                            {getColors && <Text>Colors: {getColors}</Text>}
                            <Text size='sm'><strong>Techniques:</strong> {techniques}</Text>
                            <Text size='sm'><strong>Materials:</strong> {materials}</Text>
                        </Box>
                        
                        <Box flex="1">
                            {/* Image */}
                            <Image 
                                maxW="70%"
                                src={image_thumbnail} 
                                alt={titles && titles.length > 0 ? titles[0].title : "no image available"} 
                            />
                        </Box>
                    </Flex>
                </CardBody>
            </Card>
        </div>
    );
};

export default CardDetail;