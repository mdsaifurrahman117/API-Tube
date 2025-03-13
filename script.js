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
                                    <button class="btn join-item" onclick="get_videos(${item.category_id})">
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

// Showing all the videos by default
const show_videos = (items) => {
            // console.log(items.videos);

            // Get the video container
            const video_container = document.getElementById("video_container");
            video_container.innerHTML = "";

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
                                                            class="w-full h-full object-cover rounded-br-lg rounded-bl-lg" 
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
                        </div> ` ;
                        video_container.appendChild(video_card);
            })
            // console.log(items.videos);
}

// posted time calculation 
const get_time = (time) => {
            const hours = parseInt(time / 3600);
            const remainingHours = time % 3600;
            const minutes = parseInt(remainingHours / 60);
            return `${hours} h ${minutes} m ago`;
}

// get all videos by clicking the all button
const get_videos_all = () => {
            video_container.innerHTML = "";
            videos();
}

// get videos by category
const get_videos = (id) => {
            // alert(id);
            fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
                        .then(response => response.json())
                        .then(data => show_videos(data.category))
                        .catch(error => console.log(error));
}

videos()