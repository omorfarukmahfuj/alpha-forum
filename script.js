const loadPosts = async (query = '') => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${query}`);
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
}

// Display Forum Post
const displayPosts = posts => {
  const postContainer = document.getElementById('post-container');
  postContainer.innerText = ``;

  posts.forEach(post => {
    const postContainer = document.getElementById('post-container');
    const postCard = document.createElement('div');
    const bgStatusColor = post.isActive ? '#10B981' : '#FF3434';
    postCard.classList = `flex flex-col md:flex-row gap-3 md:gap-5 bg-[#F3F3F5] transition ease-in-out delay-75 hover:bg-[#797DFC1A] hover:outline hover:outline-1 hover:outline-[#797DFC] rounded-[20px] p-4 md:p-8 mb-6`;

    postCard.innerHTML = `
    <!-- Card Left -->
    <div class="flex justify-center">
      <div class="bg-white rounded-xl relative w-[72px] h-[72px]">
        <img class="rounded-xl" src="${post.image}">
        <span id="active-status-true" class="bg-[${bgStatusColor}] p-2 rounded-full h-1 w-1 absolute -top-1 -right-1"></span>
      </div>
    </div>
  
    <!-- Card Right -->
    <div class="w-full">
      <div class="text-[#2d1612cc] font-medium text-sm text-center md:text-left mb-2">
        <small class="mr-4"># ${post.category}</small>
        <small>Author: ${post.author.name}</small>
      </div>
  
      <h3 class="text-[#12132D] font-bold text-xl text-center md:text-left mb-2 md:mb-4">${post.title}</h3>
  
      <p class="text-[#12132D99] text-base text-center md:text-left">${post.description}</p>
  
      <hr class="border-dashed border-[#12132D40] my-5">
  
      <div class="md:flex justify-between items-center">
        <div class="text-[#2d121299] text-base flex justify-center gap-6 mb-4 md:mb-0">
          <div class="flex gap-3">
            <img src="icons/comment.svg">
            <p>${post.comment_count}</p>
          </div>
          <div class="flex gap-3">
            <img src="icons/view.svg">
            <p>${post.view_count}</p>
          </div>
          <div class="flex gap-3">
            <img src="icons/time.svg">
            <p>${post.posted_time} time</p>
          </div>
        </div>
  
        <div onclick="handleMarkButton('${post.title}', ${post.view_count})" class="flex justify-center">
          <img class="w-10" src="icons/open.svg">
        </div>
      </div>
    </div>
    `;
    toggleLoadingSpinner(true);
    setTimeout(() => {
      postContainer.appendChild(postCard);
    }, 2000);

  })
  // Hide Loading Spinner
  setTimeout(() => {
    toggleLoadingSpinner(false);
  }, 2000);
}

// Handle Search
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  const query = `?category=${searchText}`;
  loadPosts(query);
}

let postCount = 0;
// Handle Mark as read Button
const handleMarkButton = (title, view_count) => {
  postCount++;
  const markedCardContainer = document.getElementById('marked-card-container');
  const markedCard = document.createElement('div');
  markedCard.classList = `p-4 bg-white grid grid-cols-4 justify-between rounded-2xl mb-3`;
  markedCard.innerHTML = `
  <!-- Card -->
    <h4 class="col-span-3 font-semibold text-base text-[#12132D]">${title}
    </h4>
    <div class="col-span-1 flex justify-end gap-2 items-center w-fit">
      <img src="icons/view.svg">
      <p>${view_count}</p>
    </div>
`;
  markedCardContainer.appendChild(markedCard);

  const totalRead = document.getElementById('total-read');
  totalRead.innerText = postCount;
}

// Toggle Loading Spinner 
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}



const loadLatestPosts = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  const data = await res.json();
  displayLatestPosts(data);
}

// Display Latest Post
const displayLatestPosts = data => {
  data.forEach(post => {
    const latestPostContainer = document.getElementById('lates-post-container');
    const LatestPostCard = document.createElement('div');
    LatestPostCard.classList = `flex flex-col md:flex-row gap-5`;

    LatestPostCard.innerHTML = `
    <!-- Card -->
    <div class="border border-1 border-[#12132D26] p-4 rounded-[20px]">
      <img class="rounded-[20px]  mb-4 md:mb-6" src="${post.cover_image}">
      <div class="flex items-center gap-2 mb-2 md:mb-3">
        <img src="icons/date.svg" alt="">
        <p class="text-[#12132D99] text-base">${post.author.posted_date ?? "No Publish Date"}</p>
      </div>
      <p class="font-extrabold text-lg text-[#12132D]  mb-2 md:mb-3">${post.title}</p>
      <p class="text-base text-[#12132D99]  mb-3 md:mb-4">${post.description}</p>

      <div class="flex items-center gap-3">
        <img class="w-11 h-11 rounded-full" src="${post.profile_image}" alt="">
        <div>
          <p class="text-base text-[#12132D] font-bold mb-1">${post.author.name}</p>
          <p class="text-sm text-[#12132D99]">${post.author.designation ?? "Unknown"}</p>
        </div>
      </div>
    </div>
    `;
    latestPostContainer.appendChild(LatestPostCard);
  })
}



loadPosts();
loadLatestPosts();
