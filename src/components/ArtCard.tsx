import './Card.css';
import { Card, CardBody, Heading, Image, Text } from '@chakra-ui/react'

const ArtCard = ({ titles, artist, has_image, image_thumbnail, materials, techniques, colors }) => {

    const getColors = (colors && Array.isArray(colors)) ? colors.map((color) => (
        <span
            key={color}
            style={{
                backgroundColor: color,    // Set the background color
                display: 'inline-block',   // Ensure it behaves like a block for width/height
                width: '20px',             // Set the width of the circle
                height: '20px',            // Set the height of the circle (equal to width for a perfect circle)
                borderRadius: '50%',       // Make it a circle
                margin: '0 5px'            // Add some space between the circles
            }}
        ></span>
    )) : null;

    return (
        
        <Card>
            <CardBody>
                <Image 
                src={has_image ? image_thumbnail : ""} 
                alt={has_image && titles && titles.length > 0 ? titles[0].title : "no image available"} 
                />
                <Heading>
                    <Heading size='md'>{titles && titles.length > 0 ? titles[0].title : "Untitled"}</Heading>
                    <Heading size='sm'>{artist || "Unknown Artist"}</Heading>
                </Heading>
                {getColors && <Text>{getColors}</Text>}
                <Text>{techniques}</Text>
                <Text>{materials}</Text>
            </CardBody>
        </Card>
        
    );
    
};

export default ArtCard;