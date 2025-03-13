// Get all the categories
const categories = () => {
            fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
                        .then(response => response.json())
                        .then(data => show_categories(data.categories))
                        .catch(error => console.log(error));
}

// Show the categories button
const show_categories = (categories) => {
            // Get the category container
            const category_container = document.getElementById("category-container");

            // Loop through the categories
            categories.forEach(item => {
                        // console.log(item.category_id);

                        // Create a new button element
                        const button_container = document.createElement("div");
                        button_container.innerHTML = document.createElement("button");
                        button_container.innerHTML = `
                                    <button id="category-btn-${item.category_id}" 
                                                class="btn join-item category-btn" onclick="get_videos(${item.category_id})">
                                                ${item.category}
                                    </button>
                        `;

                        // Append the category to the container
                        category_container.appendChild(button_container);
            })
            // console.log(categories);
}

categories();

// Get all the videos by default
const videos = () => {
            fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
                        .then(response => response.json())
                        .then(data => show_videos(data.videos))
                        .catch(error => console.log(error))
}

// posted time calculation 
const get_time = (time) => {
            const hours = parseInt(time / 3600);
            const remainingHours = time % 3600;
            const minutes = parseInt(remainingHours / 60);
            return `${hours} h ${minutes} m ago`;
}

// get the video description
const get_description = (description) => {
            fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${description}`)
                        .then(response => response.json())
                        .then(data => show_description(data.video))

            // console.log(description);
}

// show the description in the modal
const show_description = (video) => {
            console.log(video);
            const description_container = document.getElementById("description-container");
            description_container.innerHTML = `
                        <img src="${video.thumbnail}" alt="thumbnail" class="w-full h-64 object-cover rounded" />
                        <h3 class="text-lg font-bold mt-2">${video.title}</h3>
                        <p class="py-2">${video.description}</p>
            `;
            document.getElementById("open_modal").showModal();
}

// Showing all the videos by default
const show_videos = (items) => {
            // console.log(items.videos);

            // Get the video container
            const video_container = document.getElementById("video_container");
            video_container.innerHTML = "";

            if (items.length == 0) {
                        video_container.classList.remove("grid")
                        video_container.innerHTML = `
                                    <div class="min-h-[400px] w-[300px] mx-auto flex flex-col gap-5 items-center justify-center text-center">
                                                <img src="assets/not-found.png" alt="not-found" class="w-32 h-32 mx-auto">
                                                <h2 class="text-3xl font-bold">Oops! sorry, There are no content here</h2>
                                    </div>
                                    </div>
                        `;
                        return;
            } else {
                        video_container.classList.add("grid")
            }

            // Loop through the 
            items.forEach(video => {
                        // console.log(video);
                        // create a video card
                        const video_card = document.createElement("div");
                        video_card.classList = "card card-compact";

                        // append the video card to the container
                        video_card.innerHTML = `
                        <div class="card bg-base-100 w-80 md:w-[310px] mx-auto">
                                    <figure class="w-full h-52">
                                                <img src="${video.thumbnail}" alt="thumbnail" 
                                                            class="w-full h-full object-cover rounded-br-lg rounded-bl-lg cursor-pointer" 
                                                            onclick="get_description('${video.video_id}')"
                                                />
                                    </figure>
                                    <div class="px-0 py-2 flex flex-row gap-2 mt-3">
                                                <img src="${video.authors[0].profile_picture}" alt="profile" class="w-8 h-8 rounded-full" />
                                                <div class="text-sm">
                                                            <h2 class="card-title">${video.title}</h2>
                                                            <h4 class="text-sm">${video.authors[0].profile_name}
                                                                        <span>${video.authors[0].verified == true ?
                                                `<i class="ri-verified-badge-fill text-blue-400 text-sm ml-1"></i>` : ""}
                                                                        </span>
                                                            </h4>
                                                            <span class="text-sm">${video.others.views}</span>
                                                            <span>●</span>
                                                            <span class="text-sm">${video.others.posted_date?.length == 0
                                                ? "Now" : get_time(video.others.posted_date)}
                                                            </span>
                                                </div>
                                    </div>
                        </div> 
                        ` ;
                        video_container.appendChild(video_card);
            })
            // console.log(items.videos);
}

const all_btn = document.getElementById("all-btn");

// get all videos by clicking the all button
const get_videos_all = () => {
            video_container.innerHTML = "";
            videos();
            remove_active();
            all_btn.classList.add("bg-primary");
}

// remove active class from all category buttons
const remove_active = () => {
            const category_btn = document.getElementsByClassName("category-btn");
            all_btn.classList.remove("bg-primary");
            for (const btn of category_btn) {
                        btn.classList.remove("bg-primary");
            }
}

// get videos by category
const get_videos = (id) => {
            // alert(id);
            fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
                        .then(response => response.json())
                        .then(data => {
                                    remove_active();
                                    const active_category_btn = document.getElementById(`category-btn-${id}`);
                                    active_category_btn.classList.add("bg-primary");

                                    show_videos(data.category)
                        })
                        .catch(error => console.log(error));
}

videos()




/*

{
    "category_id": "1001",
    "video_id": "aaab",
    "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    "title": "Midnight Serenade",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
        }
    ],
    "others": {
        "views": "543K",
        "posted_date": ""
    },
    "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}

*/