// Get all the categories
const categories = () => {
            fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
                        .then(response => response.json())
                        .then(data => show_categories(data.categories))
                        .catch(error => console.log(error));
}

// Show the categories
const show_categories = (categories) => {
            // Get the category container
            const category_container = document.getElementById("category-container");

            // Loop through the categories
            categories.forEach(item => {
                        // console.log(item.category);

                        // Create a new button element
                        const category_item = document.createElement("button");
                        category_item.classList = "btn join-item";
                        category_item.innerText = item.category;

                        // Append the category to the container
                        category_container.appendChild(category_item);
            })
            // console.log(categories);
}

categories();