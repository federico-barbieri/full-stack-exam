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

**Fetch more art
**
When the user clicks on the "more art" button, the offset variable increases by 30, thus fetching 50 more rows and adding them to the art state variable through setArt.
