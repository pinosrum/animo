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
  document.getElementById("backBtn").style.display = "inline-block";
}
}

function showResult(text) {
  if (window.innerWidth <= 768) {
  document.querySelector(".details").style.display = "none";
}
  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="card">
      <img src="https://picsum.photos/200?random=${Math.random()}">
      <p>${text}</p>
      <button class="play"></button>
    </div>
  `;
}

function goBack() {
  if (window.innerWidth > 768) return;

  const result = document.getElementById("result");
  const details = document.querySelector(".details");

  if (result.innerHTML !== "") {
    result.innerHTML = "";
    details.style.display = "block";
    return;
  }

  details.style.display = "none";
  document.querySelectorAll(".moods button").forEach(btn =>
    btn.classList.remove("selected")
  );

  document.getElementById("backBtn").style.display = "none";
}