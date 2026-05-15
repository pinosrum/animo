function showDetail(event, type) {
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

function showResult(text) {
  const result = document.getElementById("result");

  if (window.innerWidth <= 768) {
    document.querySelector(".details").style.display = "none";
    result.style.display = "flex";
  }

  result.innerHTML = `
    <div class="card">
      <p>今の気分に合う1曲</p>
      <img src="https://picsum.photos/300?random=${Math.random()}">
      <p>${text}</p>
      <button class="play"></button>
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