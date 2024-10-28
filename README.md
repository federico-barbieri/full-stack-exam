**About
**

An application that consumes the museum SMK's public API and displays its artworks.

**Endpoints
**
Base API: https://api.smk.dk/api/v1

Addition for initial fetching: `/art/search/?keys=*&image_orientation=landscape&filters=[has_image:true],[public_domain:true]&offset=${offset}&rows=50`

**Filters
**
By setting the filters to "public_domain: true" and "has_image:true", we ensure that A. we can display the images and B. there are images to be displayed.

**Features
**

The application provides one filter (more to come) based on the century in which the artwork was created. By using the property production_date[0].period, 
we can obtain both the initial and the end date.

Because the batch of art we are fetching is of "only" 50 artworks, it's unlikely we will be able to successfully filter and find enough artworks from fx the 16th century. For that reason, we increment the batch to 700 when the user applies the century filter:

const getCentury = (century) => {
        if (!loading) {
            setArt([]);  // Clear the previous art array
            setOffset(0); // Reset the offset
            setCentury(century); // Update the selected century, triggering a new fetch
            setAmountOfArt(500); // increase the amount of art to be filtered
        }
    };

**Fetch more art
**
When the user clicks on the "more art" button, the offset variable increases by 30, thus fetching 50 more rows and adding them to the art state variable through setArt.


# Plan


## Frontend

* React and TypeScript

## Backend 

* Node and Express - REST API

## Database

* PostgreSQL + ORM (Prisma)

### DATABASE SCEMA
USERS

ARTWORKS

ARTISTS

## Local development
* Docker

## Deployment
* Frontend - Vercel
* Backend & Database - Render 

