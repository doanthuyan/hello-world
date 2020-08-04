let page = document.getElementById('buttonDiv');
  const kButtonColors = ['#D1F2EB', '#D6EAF8', '#D5F5E3', '#F9EBEA ','#F8F9F9'];
  function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
      let button = document.createElement('button');
      button.style.backgroundColor = item;
      button.addEventListener('click', function() {
        chrome.storage.sync.set({color: item}, function() {
          console.log('color is ' + item);
        })
      });
      page.appendChild(button);
    }
  }
  constructOptions(kButtonColors);