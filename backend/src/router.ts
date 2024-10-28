import {Router} from "express";
import axios from 'axios';
import prisma from "./db"

const router = Router()

/* 
PRODUCT
*/

router.get("/specific_art", async (req, res) => {
    try {
      // Make an API call to the public API (e.g., SMK Museum API)
      const apiResponse = await axios.get('https://api.smk.dk/api/v1/art/?object_number=kks5261');
      const artworkData = apiResponse.data.items[0];
      
      // Store data in Postgres using Prisma's upsert
      const savedArtwork = await prisma.artwork.upsert({
        where: { id: artworkData.id },  // Assuming `id` is from the API
  
        // If the artwork exists, update the record
        update: {
          object_number: artworkData.object_number,
          // Include other fields to update if necessary
        },
  
        // If the artwork does not exist, create a new record
        create: {
          id: artworkData.id,
          object_number: artworkData.object_number,
          // Include other fields for creation
        },
      });
      
      // Return data from Postgres
      res.json(savedArtwork);
      console.log(savedArtwork);
    } catch (error) {
      console.error('Error fetching and storing artwork:', error);
      res.status(500).json({ error: 'Failed to fetch and store artwork' });
    }
  });


export default router;