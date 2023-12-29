const inputBook = document.getElementById("inputBook");
const inputBookIsComplete = document.getElementById("inputBookIsComplete");
const inputBookTitle = document.getElementById("inputBookTitle");
const inputBookAuthor = document.getElementById("inputBookAuthor");
const inputBookYear = document.getElementById("inputBookYear");
const completeBookshelfList = document.getElementById("completeBookshelfList");
const incompleteBookshelfList = document.getElementById(
  "incompleteBookshelfList"
);
const searchBook = document.getElementById("searchBook");
const searchBookTitle = document.getElementById("searchBookTitle");

const completeBookList = [];
const incompleteBookList = [];

const localStorageComplete = "COMPLETE_BOOK";
const localStorageIncomplete = "INCOMPLETE_BOOK";

function checkLocalStorage() {
  return typeof Storage !== undefined;
}

window.addEventListener("load", () => {
  if (localStorage.getItem(localStorageComplete) !== null) {
    importDataFromLocal();
    displayCompleteBooks();
  }

  if (localStorage.getItem(localStorageIncomplete) !== null) {
    displayIncompleteBooks();
  }
});

function importDataFromLocal() {
  const completeBookFromStorage = JSON.parse(
    localStorage.getItem(localStorageComplete)
    );
    for (const key in completeBookFromStorage) {
      completeBookList.push(completeBookFromStorage[key]);
    }
    
    const incompleteBookFromStorage = JSON.parse(
      localStorage.getItem(localStorageIncomplete)
      );
      for (const key in incompleteBookFromStorage) {
        incompleteBookList.push(incompleteBookFromStorage[key]);
      }
}

inputBook.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookData();
});
    
function addBookData() {
  if (inputBookIsComplete.checked) {
    completeBookList.push({
      id: +new Date(),
      title: inputBookTitle.value,
      author: inputBookAuthor.value,
      year: Number(inputBookYear.value),
      isComplete: true,
    });
    localStorage.setItem(
      localStorageComplete,
      JSON.stringify(completeBookList)
    );
    displayCompleteBooks();
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
  } else {
    incompleteBookList.push({
      id: +new Date(),
      title: inputBookTitle.value,
      author: inputBookAuthor.value,
      year: Number(inputBookYear.value),
      isComplete: false,
    });
    localStorage.setItem(
      localStorageIncomplete,
      JSON.stringify(incompleteBookList)
    );
    displayIncompleteBooks();
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
  }
}

function displayCompleteBooks() {
  let htmlElement = "";
  for (let index = 0; index < completeBookList.length; index++) {
    const display = `<article class="book_item">
                          <h3>${completeBookList[index].title}</h3>
                          <p>Penulis: ${completeBookList[index].author}</p>
                          <p>Tahun: ${completeBookList[index].year}</p>
                        <div class="action">
                          <button onclick="addToIncompleteList(${index})" onclick="" class="green">Belum selesai di Baca</button>
                          <button onclick="removeCompleteBook(${index})" class="red">Hapus buku</button>
                        </div>
                      </article>`;
    htmlElement += display;
  }
  completeBookshelfList.innerHTML = htmlElement;
}

function displayIncompleteBooks() {
  let htmlElement = "";
  for (let index = 0; index < incompleteBookList.length; index++) {
    const display = `<article class="book_item">
                          <h3>${incompleteBookList[index].title}</h3>
                          <p>Penulis: ${incompleteBookList[index].author}</p>
                          <p>Tahun: ${incompleteBookList[index].year}</p>
                        <div class="action">
                          <button onclick="addToCompleteList(${index})" class="green">Selesai di Baca</button>
                          <button onclick="removeIncompleteBook(${index})" class="red">Hapus buku</button>
                        </div>
                      </article>`;
    htmlElement += display;
  }
  incompleteBookshelfList.innerHTML = htmlElement;
}

function addToCompleteList(index) {
  incompleteBookList[index].isComplete = true;
  completeBookList.push(incompleteBookList[index]);
  incompleteBookList.splice(index, 1);
  localStorage.setItem(localStorageComplete, JSON.stringify(completeBookList));
  localStorage.setItem(
    localStorageIncomplete,
    JSON.stringify(incompleteBookList)
  );
  displayIncompleteBooks();
  displayCompleteBooks();
}

function addToIncompleteList(index) {
  completeBookList[index].isComplete = false;
  incompleteBookList.push(completeBookList[index]);
  completeBookList.splice(index, 1);
  localStorage.setItem(localStorageComplete, JSON.stringify(completeBookList));
  localStorage.setItem(
    localStorageIncomplete,
    JSON.stringify(incompleteBookList)
  );
  displayIncompleteBooks();
  displayCompleteBooks();
}

function removeIncompleteBook(index) {
  alert(`Buku ${incompleteBookList[index].title} telah di hapus!`);
  incompleteBookList.splice(index, 1);
  
  localStorage.setItem(
    localStorageIncomplete,
    JSON.stringify(incompleteBookList)
  );
  displayIncompleteBooks();
}

function removeCompleteBook(index) {
  alert(`Buku ${completeBookList[index].title} telah di hapus!`);
  completeBookList.splice(index, 1);

  localStorage.setItem(localStorageComplete, JSON.stringify(completeBookList));
  displayCompleteBooks();
}

searchBook.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchText = document
    .getElementById("searchBookTitle")
    .value.toLowerCase();

  const incomplete = document.querySelectorAll("article");
  const complete = document.querySelectorAll("article");

  for (let i = 0; i < incomplete.length; i++) {
    let a = incomplete[i].getElementsByTagName("h3")[0];
    let txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(searchText) > -1) {
      incomplete[i].style.display = "";
    } else {
      incomplete[i].style.display = "none";
    }
  }
  for (let i = 0; i < complete.length; i++) {
    let b = complete[i].getElementsByTagName("h3")[0];
    let txtValue = b.textContent || b.innerText;
    if (txtValue.toLowerCase().indexOf(searchText) > -1) {
      complete[i].style.display = "";
    } else {
      complete[i].style.display = "none";
    }
  }
});