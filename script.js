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
    happy: "https://picsum.photos/1200/800?sun",
    relax: "https://picsum.photos/1200/800?nature",
    tired: "https://picsum.photos/1200/800?night",
    sad: "https://picsum.photos/1200/800?rain",
    angry: "https://picsum.photos/1200/800?red"
  };

  document.getElementById("bg-image").style.backgroundImage =
    "url(" + images[type] + ")";

  document.getElementById("result").innerHTML = "";
}

function showResult(text) {
  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="card">
      <img src="https://picsum.photos/200?random=${Math.random()}">
      <p>${text}</p>
      <button class="play"></button>
    </div>
  `;
}
