function showDetail(event, type) {

  fetch("/save-mood", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
   body: JSON.stringify({
    mood: type
  })
});

  document.querySelectorAll(".moods button").forEach(btn => btn.classList.remove("selected"));
  event.target.classList.add("selected");

  document.querySelectorAll(".detail-box").forEach(el => el.style.display = "none");
  document.querySelector(".details").style.display = "block";
  document.getElementById(type).style.display = "block";

  const bg = {
    happy: "#fce7f3",
    relax: "#dcfce7",
    tired: "#dbeafe",
    sad: "#e0e7ff",
    angry: "#fee2e2"
  };
  
  const images = {
    happy: "https://picsum.photos/800/500?sun",
    relax: "https://picsum.photos/800/500?nature",
    tired: "https://picsum.photos/800/500?night",
    sad: "https://picsum.photos/800/500?rain",
    angry: "https://picsum.photos/800/500?red"
  };

Object.values(images).forEach(src => {
  const img = new Image();
  img.src = src;
});

  document.getElementById("bg-image").style.backgroundImage =
    "url(" + images[type] + ")";

  document.getElementById("result").innerHTML = "";

if (window.innerWidth <= 768) {
  document.querySelector(".moods").style.display = "none";
  document.querySelector(".details").style.display = "block";
  document.getElementById("backBtn").style.display = "inline-block";
}
}

async function showResult(text) {
  const track = await getMusic();

  const result = document.getElementById("result");

  if (window.innerWidth <= 768) {
    document.querySelector(".details").style.display = "none";
    result.style.display = "flex";
  }

 result.innerHTML = `
  <div class="card">

    <p>今の気分に合う1曲</p>

    <img src="${track.album.images[0].url}">

<p>${track.name}</p>
<p>${track.artists[0].name}</p>

    <div class="music-controls">

      <button class="sub-btn">
        ⏮
      </button>

      <button class="play" onclick="togglePlay(this)">
        ▶
      </button>

      <button class="sub-btn">
        ⏭
      </button>

    </div>

    <div class="progress-wrap">

      <span class="time">1:21</span>

      <div class="progress">
        <div class="progress-bar"></div>
      </div>

      <span class="time">3:57</span>

    </div>

  </div>
`;
}

function goBack() {
  if (window.innerWidth > 768) return;

  const result = document.getElementById("result");
  const details = document.querySelector(".details");
  const moods = document.querySelector(".moods");

  if (result.innerHTML !== "") {
    result.innerHTML = "";
    result.style.display = "none";
    details.style.display = "block";
    return;
  }

  details.style.display = "none";
result.style.display = "none";
result.innerHTML = "";
moods.style.display = "grid";

document.querySelectorAll(".moods button").forEach(btn =>
  btn.classList.remove("selected")
);

document.getElementById("backBtn").style.display = "none";

  document.querySelectorAll(".moods button").forEach(btn =>
    btn.classList.remove("selected")
  );

  document.getElementById("backBtn").style.display = "none";
}

function togglePlay(button) {
  if (button.innerHTML === "▶") {
    button.innerHTML = "⏸";
  } else {
    button.innerHTML = "▶";
  }
}

async function getMusic() {
  const tokenRes = await fetch("/token");
  const tokenData = await tokenRes.json();

  const token = tokenData.access_token;

  const response = await fetch(
    "https://api.spotify.com/v1/search?q=jpop&type=track&limit=10",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

const random =
  Math.floor(Math.random() * data.tracks.items.length);

const track = data.tracks.items[random];

console.log("track取得", track);

return track;

}

console.log("script loaded");

document
  .getElementById("spotify-login")
  .addEventListener("click", () => {
    console.log("spotify login clicked");
  });

