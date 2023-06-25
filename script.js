let tableData = [];

//Using .then
fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
  .then((received) => received.json())
  .then((receivedData) => {
    tableData = receivedData;
    //Calling Diplay function
    renderTable(tableData);
  })
  .catch((error) => {
    console.error("Error :", error);
  });

//Using async/await
fetchData();
async function fetchData() {
  let response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );

  let receivedData = await response.json();
  tableData = receivedData;

  try {
    renderTable(tableData);
  } catch (error) {
    console.error("Error :", error);
  }
}

//displaying table onto UI
function renderTable(displayData) {
  const table = document.getElementById("table");

  table.innerHTML = "";
  displayData.forEach((element) => {
    const row = document.createElement("tr");
    const colorPercentage =
      element.market_cap_change_percentage_24h > 0
        ? "green-percentage"
        : "red-percentage";
    row.innerHTML = `
        <td><img src="${element.image}" alt="${element.name}" width="20"></td>
        <td>${element.name}</td>
        <td>${element.symbol}</td>
        <td>$ ${element.current_price}</td>
        <td>$ ${element.market_cap}</td>
        <td id="${colorPercentage}">${element.market_cap_change_percentage_24h} %</td>
        <td>Mkt Cap : $ ${element.total_volume}</td>
        `;
    table.appendChild(row);
  });
}

//filtered data
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", filterData);

function filterData(event) {
  let searchedString = event.target.value.trim().toLowerCase();

  if (searchedString === "") {
    renderTable(tableData);
    return;
  }
  const filteredData = tableData.filter((item) => {
    const symbol = item.symbol.toLowerCase();
    const name = item.name.toLowerCase();
    return symbol.includes(searchedString) || name.includes(searchedString);
  });
  renderTable(filteredData);
}

//sort by market cap

document.getElementById("sortByMarketCap").addEventListener("click", (e) => {
  tableData.sort((a, b) => a.total_volume - b.total_volume);
  renderTable(tableData);
});

//sort by percentage
document.getElementById("sortByPercentage").addEventListener("click", (e) => {
  tableData.sort(
    (a, b) =>
      a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
  );
  renderTable(tableData);
});
