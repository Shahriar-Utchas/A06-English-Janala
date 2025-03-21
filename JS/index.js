//fetch the level num and show in buttons
function fetchLevels() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => getLevels(data.data));
}
function getLevels(data) {
  const learn_btns = document.getElementById("learn-btns");
  data.forEach((element) => {
    const newBtns = document.createElement("button");
    newBtns.innerHTML = `
            <button 
                id="learn-btn${element.level_no}"
                class="btn btn-sm btn-outline btn-primary lrn_btn" 
                onclick="fetch_wordByLevel(${element.level_no})"
                value ="${element.level_no}">
                <i class="fa-solid fa-book-open"></i>Lesson-${element.level_no}
            </button>
    `;
    learn_btns.appendChild(newBtns);
  });
}
fetchLevels();

//Loader function
function showLoader() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
}
function hideLoader() {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
}

//fetch word by level id and show in card
function fetch_wordByLevel(level_id) {
  const btn_selectted = document.getElementById(`learn-btn${level_id}`);
  const lrn_btns = document.querySelectorAll(".lrn_btn");
  lrn_btns.forEach((btn) => {
    btn.classList.remove("lsn-active");
  });
  btn_selectted.classList.add("lsn-active");
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/level/${level_id}`)
    .then((res) => res.json())
    .then((data) => getWords(data.data));
}

function getWords(data) {
  const lsn_card_selected = document.getElementById("lsn_card_selected");
  const lsn_card_not_selected = document.getElementById(
    "lsn_card_not_selected"
  );
  const no_vocabulary = document.getElementById("lsn_card_no_vocabulary");
  lsn_card_not_selected.classList.add("hidden");
  if (data.length !== 0) {
    lsn_card_selected.innerHTML = "";
    no_vocabulary.classList.add("hidden");

    data.forEach((element) => {
      const newElement = document.createElement("div");
      newElement.innerHTML = `
              <div id="lsn_card_selected" class="lesson-card-selected">
            <div class="card bg-white w-44 md:w-64">
              <div class="card-body items-center text-center">
                <h2 class="card-title">${
                  element.word !== null ? element.word : "No word found"
                }</h2>
                <p class = "font-semibold">Meaning/pronounciation</p>
                <p>"${
                  element.meaning !== null
                    ? element.meaning
                    : "No meaning found"
                }/${
        element.pronunciation !== null
          ? element.pronunciation
          : "No pronounciation found"
      }"</p>
              </div>
              <div class="card-actions flex justify-between p-4">
                <button onclick="fetch_Wordinfo(${
                  element.id
                })"  class="btn btn-primary bg-blue-500"><i class="fa-solid fa-circle-question"></i></button>

                <button onclick="pronounceWord('${
                  element.word
                }')" class="btn btn-ghost bg-blue-500">
                <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
          </div>
  `;
      lsn_card_selected.appendChild(newElement);
    });
  } else {
    const no_vocabulary = document.getElementById("lsn_card_no_vocabulary");
    lsn_card_selected.innerHTML = "";
    no_vocabulary.classList.remove("hidden");
  }
  hideLoader();
}

function fetch_Wordinfo(id) {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => getWordInfo(data.data));
}

function getWordInfo(data) {
  //show data in modal
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  const newElement = document.createElement("div");
  newElement.innerHTML = `
      <div class="modal-box w-full md:w-[420px] p-6 rounded-xl">
          <h3 class="text-xl font-bold">
            ${
              data.word
            } <span class="text-gray-500">(<i class="fa-solid fa-microphone-lines"></i>: ${
    data.pronunciation
  })</span>
          </h3>

        <p class="mt-4 font-semibold">Meaning</p>
        <p class="text-gray-700">${
          data.meaning !== null ? data.meaning : "No meaning found"
        }</p>

        <p class="mt-4 font-semibold">Example</p>
        <p class="text-gray-700">${data.sentence}</p>

        <p class="mt-4 font-semibold">সমার্থক শব্দ গুলো</p>
        <div class="flex flex-wrap gap-2">
        ${
          data.synonyms.length === 0
            ? '<span class="px-3 py-1 rounded-lg bg-gray-200">No synonyms available</span>'
            : data.synonyms
                .map(
                  (synonym) =>
                    `<span class="px-3 py-1 rounded-lg bg-gray-200">${synonym}</span>`
                )
                .join("")
        }
        
        </div>

        <div class="modal-action mt-6 flex justify-start">
          <form method="dialog">
            <button class="btn bg-primary text-white px-5 py-2 rounded-lg hover:bg-indigo-800">
              Complete Learning
            </button>
          </form>
        </div>
      </div>

      `;
  modal.appendChild(newElement);
  modal.showModal();
}

//pronounce word function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//login-logout feature

const input_name = document.getElementById("input-name");
const input_password = document.getElementById("input-password");
const login_btn = document.getElementById("login-btn");
login_btn.addEventListener("click", function () {
  const name = input_name.value;
  const password = input_password.value;
  if (name === "" && password === "") {
    swal("Error", "Please Enter Your Name and Password", "error");
  } else if (name === "") {
    swal("Error", "Please Enter Your Name", "error");
  } else if (password === "") {
    swal("Error", "Please Enter Your Password", "error");
  } else if (name !== "" && password !== "123456") {
    swal("Error", "Password incorrect, type '123456'", "error");
  } else {
    login_success();
  }
});

function login_success() {
  swal("success", "Login successfull", "success");
  const header = document.getElementById("header");
  const hero = document.getElementById("hero");
  const learn_vocabularies = document.getElementById("learn-vocabularies");
  const FAQ = document.getElementById("FAQ");

  header.classList.remove("hidden");
  hero.classList.add("hidden");
  learn_vocabularies.classList.remove("hidden");
  FAQ.classList.remove("hidden");
  window.scrollTo(0, 0);
}

//logout function
const logout_btn = document.getElementById("log-out");
logout_btn.addEventListener("click", function () {
  const header = document.getElementById("header");
  const hero = document.getElementById("hero");
  const learn_vocabularies = document.getElementById("learn-vocabularies");
  const FAQ = document.getElementById("FAQ");

  header.classList.add("hidden");
  hero.classList.remove("hidden");
  learn_vocabularies.classList.add("hidden");
  FAQ.classList.add("hidden");
});
