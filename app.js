// for fetching and searching item by name or letter
const searchItem = () => {
  const itemName = document.getElementById("search").value;
  document.getElementById("search").value = "";
  document.getElementById("error-message").innerText = "";
  if (itemName == "") {
    showErrorMessage("Plese Write Something to Search!");
  } else {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + itemName)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("meal-div").innerHTML = ""; //akbar search er por ager search er data muse fela
        document.getElementById("meal-details").innerHTML = ""; //akbar search er por ager ingredients er data muse fela
        displayItems(data);
      });
  }
};

//enter button press searching functionality
document
  .getElementById("search")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      searchItem();    }
  });

// showing search based items result
const displayItems = (items) => {
  let mealItems = items.meals;
  if (mealItems !== null) {
    const mealDiv = document.getElementById("meal-div");
    mealItems.forEach((item) => {
      const mealItemDiv = document.createElement("div");
      const mealInfo = `
    <img onclick="mealDetails('${item.strMeal}')" src="${item.strMealThumb}">
    <h4 onclick="mealDetails('${item.strMeal}')">${item.strMeal}</h4>
    `;
      const mealStyle = `box-shadow: 2px 2px 10px grey;
    width:260px;
    border-radius: 5px;
    padding: 5px;`;
      mealItemDiv.style = mealStyle;
      mealItemDiv.innerHTML = mealInfo;
      mealDiv.appendChild(mealItemDiv);
    });
  } else {
    showErrorMessage("Sorry! We couldn't find such item. Try again!"); //jodi amon kono input ashe jeta search a nei ba null
  }
};

// after click on item name showing details
const mealDetails = (name) => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.meals[0]);
    });
};

const showDetails = (clickedItem) => {
  const mealDiv = document.getElementById("meal-details");
  document.getElementById("meal-details").innerHTML = "";
  const mealInnerDiv = document.createElement("div");
  const ingredient = [];
  for (let i = 1; i <= 20; i++) {
    if (clickedItem[`strIngredient${i}`]) {
      ingredient.push(
        `<li><i class="fas fa-check-square bg-white text-danger"></i> ${
          clickedItem[`strMeasure${i}`]
        } ${clickedItem[`strIngredient${i}`]}</li>`
      );
    }
  }
  mealInnerDiv.innerHTML = `
  <img src="${clickedItem.strMealThumb}">
  <h4>Name: ${clickedItem.strMeal}</h4>
  <h5>Food Area: ${clickedItem.strArea}</h5>
  <h5>Ingredients:</h5>
  <ul>
    ${ingredient.join("")}
  </ul>
  <h5>Instructions: </h5><span syle:"text-align:justify">${
    clickedItem.strInstructions
  }</span><br>
  <button class="btn btn-danger" id="close" style="margin-top:20px;" >Close Recipe</button>
  
  `;
  const mealInnerDivStyle = `text-align:justify;
    width:340px;
    border-radius: 3px;
    padding: 5px;
  `;
  mealInnerDiv.style = mealInnerDivStyle;
  mealDiv.appendChild(mealInnerDiv);
  document.getElementById("close").addEventListener("click", function () {
    document.getElementById("meal-details").innerHTML = "";
  });
};

const showErrorMessage = (msg) => {
  const errorMessageHeader = document.getElementById("error-message");
  errorMessageHeader.innerText = msg;
};
