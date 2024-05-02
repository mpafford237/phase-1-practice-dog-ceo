document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch and display images
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        const images = data.message;
        const imageContainer = document.getElementById('dog-image-container');

        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Dog image';
            imageContainer.appendChild(img);
        });
    })
    .catch(error => {
        console.error("Error fetching images: ", error);
    });

    // Fetch and display breeds
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const breeds = data.message;
        const breedContainer = document.getElementById("dog-breeds");

        Object.keys(breeds).forEach(breedName => {
            const breedItem = document.createElement('li');
            breedItem.textContent = breedName;
            breedItem.classList.add('breed-item'); // Class for easier selection
            breedContainer.appendChild(breedItem);

            // Add click event listener for changing color
            breedItem.addEventListener('click', () => {
                breedItem.style.color = breedItem.style.color === 'red' ? '' : 'red';
            });
        });

        // Dropdown for filtering breeds
        const dropdown = document.getElementById("breed-dropdown");
        dropdown.addEventListener('change', function(e) {
            const selectedLetter = e.target.value.toLowerCase(); // Ensure lowercase matching
            const breedItems = document.querySelectorAll('.breed-item');

            breedItems.forEach(item => {
                // Display only items starting with the selected letter
                if (item.textContent.toLowerCase().startsWith(selectedLetter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    })
    .catch(error => {
        console.error("Error fetching breed data: ", error);
    });
});
