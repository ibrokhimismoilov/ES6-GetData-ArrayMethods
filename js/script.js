let getDataFormBtns = document.querySelector(".get-data-form");
let table = document.querySelector("table");

getDataFormBtns.addEventListener("submit", function (e) {
  e.preventDefault();

  // remove table th tags
  if (document.querySelectorAll("thead th").length) {
    document.querySelectorAll("thead th").forEach((item) => item.remove());
  }

  // remove table tr tags
  if (document.querySelectorAll("tbody tr").length) {
    document.querySelectorAll("tbody tr").forEach((item) => item.remove());
  }

  // checkbox btns && values
  let newArr = [];
  for (let i = 0; i < e.target.length; i++) {
    if (e.target[i].checked) {
      newArr.push(e.target[i]);
    }
  }
  let newArrValues = newArr.map((item) => item.value);

  // th values

  let tagTh = document.createElement("th");
  tagTh.innerText = "Id";
  table.querySelector("thead tr").appendChild(tagTh);
  newArrValues.forEach((item) => {
    let tagTh = document.createElement("th");
    tagTh.innerText = item;
    table.querySelector("thead tr").appendChild(tagTh);
  });

  // promise get data
  if (newArr.length > 0) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        res.forEach((user, index) => {
          const newUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            company: user.company.name,
            city: user.address.city,
            zipcode: user.address.zipcode,
            address: user.address.street + ". " + user.address.suite,
          };

          let tagTr = document.createElement("tr");
          table.querySelector("tbody").appendChild(tagTr);

          let tagTd = document.createElement("td");
          tagTd.innerText = newUser.id;
          table.querySelectorAll("tbody tr")[index].appendChild(tagTd);

          newArrValues.forEach((item, tdIndex) => {
            let tagTd = document.createElement("td");
            tagTd.innerText = newUser[item];
            table.querySelectorAll("tbody tr")[index].appendChild(tagTd);
          });
        });

        document
          .querySelector(".search-input")
          .addEventListener("keyup", function (e) {
            if (table.querySelectorAll("tbody tr").length > 0) {
              table.querySelectorAll("tbody tr").forEach((item) => {
                if (
                  item.innerText
                    .toLowerCase()
                    .indexOf(e.target.value.toLowerCase()) >= 0
                ) {
                  item.removeAttribute("style");
                } else {
                  item.style.display = "none";
                }
              });
            } else {
              alert("table is empty");
            }
          });
      })
      .catch((err) => console.error(err.message));
  } else {
    alert("Iltimos kerakli ma'lumotlar tugmasini bosing.");
  }
});
