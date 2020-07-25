const apiKey = 'I10Nvgt8uP-Wm2S3jfpxrZLyrVqk0PEUKFT1l5gOAzbHY2GjU98qoBbPn4MultncsPiEEro7zWXWc_HNra6XtwZrYhf4PrlPu4YmKWT2hFqQHyQC-IIU8K5K-N8bX3Yx';
const Yelp = {
    search(term, location, sortBy) {
        const results = fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
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
                        reviewCount: business.review_count
                    }
                })
            }
        })
        return results;
    }
};

export default Yelp;