import { apiKey } from './YelpKey.js'

const Yelp = {
    search(term, location, sortBy, radius) {
        const results = fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&radius=${radius}`,
            { headers: { Authorization: `Bearer ${apiKey}`} }
        ).then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        latitude: business.coordinates.latitude,
                        longitude: business.coordinates.longitude,
                        url: business.url,
                        distance: business.distance
                    }
                })
            }
            else { 
                throw new Error('No results returned');
            }
        })
        return results;
    }
};

export default Yelp;