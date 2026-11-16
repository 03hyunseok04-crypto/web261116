
// app.js : 영화 배열을 다루는 함수 / 이현석 2651055 / 11주차

// 포스터 경로, 크기 => TMDB 이미지 주소
function posterUrl(path, size) {
  return "https://image.tmdb.org/t/p/" + size + path;
}

function average(list) {
  let sum = 0;

  for (const m of list) {
    sum += m.rating;
  }

  return sum / list.length;
}

function best(list) {
  let highest = list[0];

  for (const m of list) {
    if (m.rating > highest.rating) {
      highest = m;
    }
  }

  return highest;
}

function filterByRating(list, min) {
  return list.filter(m => m.rating >= min);
}

function yearsSince(dateStr) {
  const year = Number(dateStr.slice(0, 4));
  return new Date().getFullYear() - year;
}

function renderCards(list) {
  const board = document.querySelector("#board");

  board.innerHTML = "";

  for (const m of list) {
    const card = document.createElement("article");
    card.className = "card";

    if (m.rating >= 8) {
      card.classList.add("hot");
    }

    card.innerHTML = `
      <img class="poster"
           src="${posterUrl(m.poster, "w342")}"
           alt="${m.title} 포스터">

      <span class="badge">${m.rating}</span>

      <div class="info">
        <h3>${m.title}</h3>
        <p class="year">${m.year}</p>
      </div>
    `;

    board.appendChild(card);
  }


  document.getElementById("count").textContent =
    "총 " + list.length + "편";
}

function sortBy(list, key, desc) {
  const copy = [...list];

  copy.sort((a, b) => {
    if (typeof a[key] === "string") {
      return a[key].localeCompare(b[key]);
    }

    return a[key] - b[key];
  });

  if (desc) {
    copy.reverse();
  }

  return copy;
}

function applySort() {
  const key = document.getElementById("sort").value;

  renderCards(sortBy(movies, key, key !== "title"));
}

applySort();
