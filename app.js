// for fetching and searching item by name or letter
const searchItem = () => {
  const itemName = document.getElementById("search").value;
  document.getElementById("search").value = "";
  if (itemName == "") {
    alert("Please, write any item name to search!");
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

// showing search based items result
const displayItems = (items) => {
  let mealItems = items.meals;
  if (mealItems !== null) {
    const mealDiv = document.getElementById("meal-div");
    mealItems.forEach((item) => {
      const mealItemDiv = document.createElement("div");
      const mealInfo = `
    <img onclick="mealDetails('${item.strMeal}')" src="${item.strMealThumb}">
    <h3 onclick="mealDetails('${item.strMeal}')">${item.strMeal}</h3>
    `;
      const mealStyle = `border: 1px solid lightgray;
    width:260px;
    border-radius: 3px;
    padding: 5px;`;
      mealItemDiv.style = mealStyle;
      mealItemDiv.innerHTML = mealInfo;
      mealDiv.appendChild(mealItemDiv);
    });
  } else {
    alert("Sorry! We couldn't find such item. Try again!"); //jodi amon kono input ashe jeta search a nei ba null
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
  mealDiv.innerHTML = `
  <img src="${clickedItem.strMealThumb}">
  <h3>Name: ${clickedItem.strMeal}</h3>
  <h5 style="margin-left: -60px">Ingredients:</h5>
  <ul>
    ${ingredient.join("")}
  </ul>
  
  `;
};
