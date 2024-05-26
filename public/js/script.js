document.addEventListener('DOMContentLoaded', () => {
    fetch('worker_data.json')
      .then(response => response.json())
      .then(data => {
        populateFilters(data);
        renderTable(data);
  
        document.getElementById('typeRatingFilter').addEventListener('change', () => {
          filterAndRender(data);
        });
  
        document.getElementById('routeFilter').addEventListener('change', () => {
          filterAndRender(data);
        });
      });
  });
  
  function populateFilters(data) {
    const typeRatingFilter = document.getElementById('typeRatingFilter');
    const routeFilter = document.getElementById('routeFilter');
  
    const typeRatings = [...new Set(data.map(item => item['Type & Rating']))];
    const routes = [...new Set(data.map(item => item['Route']))];
  
    typeRatings.forEach(typeRating => {
      const option = document.createElement('option');
      option.value = typeRating;
      option.textContent = typeRating;
      typeRatingFilter.appendChild(option);
    });
  
    routes.forEach(route => {
      const option = document.createElement('option');
      option.value = route;
      option.textContent = route;
      routeFilter.appendChild(option);
    });
  }
  
  function filterAndRender(data) {
    const typeRatingFilter = document.getElementById('typeRatingFilter').value;
    const routeFilter = document.getElementById('routeFilter').value;
  
    const filteredData = data.filter(item => {
      return (typeRatingFilter === '' || item['Type & Rating'] === typeRatingFilter) &&
             (routeFilter === '' || item['Route'] === routeFilter);
    });
  
    renderTable(filteredData);
  }
  
  function renderTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
  
    data.forEach(item => {
      const row = document.createElement('tr');
  
      const orgNameCell = document.createElement('td');
      orgNameCell.textContent = item['Organisation Name'];
      row.appendChild(orgNameCell);
  
      const townCityCell = document.createElement('td');
      townCityCell.textContent = item['Town/City'];
      row.appendChild(townCityCell);
  
      const countyCell = document.createElement('td');
      countyCell.textContent = item['County'];
      row.appendChild(countyCell);
  
      const typeRatingCell = document.createElement('td');
      typeRatingCell.textContent = item['Type & Rating'];
      row.appendChild(typeRatingCell);
  
      const routeCell = document.createElement('td');
      routeCell.textContent = item['Route'];
      row.appendChild(routeCell);
  
      tableBody.appendChild(row);
    });
  }
  