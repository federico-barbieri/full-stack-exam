import apiClient from "../services/apiClient";
import {useState, useEffect} from "react";
import './Grid.css';
import Card from "./Card";



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
        <div className="cardGrid">
            
            <ul>

                {art.map((artItem) => (
                    <li key={artItem.id}>
                        <Card 
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
    )
};

export default Grid;
