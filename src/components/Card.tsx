// @ts-expect-error do it
import React from "react";
import './Card.css';

const Card = ({ titles, artist, has_image, image_thumbnail, materials, techniques, colors }) => {
    // @ts-expect-error do it
    return (
        <div className="individualCard">
            <div className="cardImageContainer">
            <img 
                width="200px" 
                src={has_image ? image_thumbnail : ""} 
                alt={has_image && titles && titles.length > 0 ? titles[0].title : "no image available"} 
            />
            </div>
            <div className="cardInfo">

            {/* Handle undefined titles or empty arrays */}
            <h2>{titles && titles.length > 0 ? titles[0].title : "Untitled"}</h2>
            <h3>{artist || "Unknown Artist"}</h3>
            <h4>Materials: {materials ? materials : "Not specified"}</h4>
            <h4>Techniques: {techniques}</h4>
            <h4>Colors: {colors.map((color) => (

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
                

            ))}</h4>
            </div>
        </div>
    );
};

export default Card;