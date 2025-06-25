// Get references to the HTML elements where i have writted the id of gallery, id of search
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');

// i used this Function to fetch and show artworks from the API of art institutes of Chicago
function fetchArtworks(searchTerm) {
  // searchTerm is the word the user types in the input.

//If the user types nothing, it will use the default word 'painting'.

  const query = searchTerm || 'painting';

  // Art Institute of Chicago API with search and fields
  const url = 'https://api.artic.edu/api/v1/artworks/search?q=' + encodeURIComponent(query) + '&limit=12&fields=id,title,image_id,artist_display';

  // Fetch data from the API
  fetch(url)
    .then(function(response) {
      return response.json(); // Convert response to JSON
    })
    .then(function(data) {
      // Clear previous results
      gallery.innerHTML = '';

      // Loop through the artworks
      data.data.forEach(function(artwork) {
        //I  Created full image URL using image_id
        const imageUrl = 'https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/843,/0/default.jpg';

        // I Created a new div for the artwork card
        const card = document.createElement('div');
        card.className = 'art-card';

        // I Added HTML inside the card
        card.innerHTML = `
          <img src="${imageUrl}" alt="${artwork.title}" />
          <h3>${artwork.title}</h3>
          <p>${artwork.artist_display || 'Unknown Artist'}</p>
        `;

        // I Added the card to the gallery
        gallery.appendChild(card);
      });
    })
    .catch(function(error) {
      console.log('Error fetching data:', error);
    });
}

//I Listen for typing in the search box
searchInput.addEventListener('input', function() {
  const value = searchInput.value;
  fetchArtworks(value);
});

// Load default artworks when the page first loads
fetchArtworks();
