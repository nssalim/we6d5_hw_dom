document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#endangeredlist-submit');
    form.lastElementChild.lastElementChild.disabled = true;
    for (let input of form.lastElementChild.firstElementChild.childNodes) {
      if (input.type === "text") {
      input.addEventListener('keyup', formValidation);
      }
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const formInputs = e.target.elements;
      const endangeredlistDiv = document.querySelector('#endangeredlist-display');
      const endangeredlistWrapper = addElementToPage('div', '', endangeredlistDiv);
      const endangeredlistTitle = addElementToPage('h2', formInputs[1].value, endangeredlistWrapper);
      const chosenBy = addElementToPage('h4', 'Chosen by: ', endangeredlistWrapper)
      const chosenName = addElementToPage('span', formInputs[0].value, chosenBy);
      const endangeredlist = addElementToPage('ol', '', endangeredlistWrapper);
      const deleteButton = addElementToPage('span', 'x', endangeredlistWrapper);
      deleteButton.classList.add('close-button');
      endangeredlistWrapper.classList.add('endangeredlist');

      // delete all button
      const deleteAllButton = document.querySelector('#delete-all');
      deleteAllButton.addEventListener('click', handleDeleteAllClick);
  
      for (let i=2; i<(formInputs.length-1); i++) {
        if (i % 2 === 0) {
          let endangeredlistItem = document.createElement('li');
          endangeredlistItem.textContent = formInputs[i].value;
          endangeredlist.append(endangeredlistItem);
        } else {
          endangeredlist.lastChild.textContent += ` : ${formInputs[i].value}`;
        }
      }
      fadeIn(endangeredlistWrapper);
      deleteButton.addEventListener('click', () => {
        fadeOut(endangeredlistWrapper);
      });
      e.target.reset();
      e.target.lastElementChild.lastElementChild.disabled = true;
    });
  
  });
  
  function addElementToPage(element, text, parent) {
    const newElement = document.createElement(element);
    newElement.textContent = text;
    parent.append(newElement);
    if (element === 'div') {
      newElement.style.display = 'none';
      }
    return newElement;
  }
  
  function fadeIn(element) {
      let op = 0.1;
      element.style.opacity = op;
      element.style.display = 'block';
      const timer = setInterval(function () {
          if (op >= 1){
              clearInterval(timer);
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op *= 1.1;
      }, 10);
  }
  
  function fadeOut(element) {
      element.style.opacity = 1;
      const timer = setInterval(function () {
          if (element.style.opacity < 0.1){
              clearInterval(timer);
          } else {
            element.style.opacity -= 0.1;
          }
      }, 20);
      setTimeout(() => {
        element.style.display = 'none';
      }, 350)
  }
  
  formValidation = function () {
    const form = document.querySelector('#endangeredlist-submit');
    let validation = true;
    for (let element of form.lastElementChild.firstElementChild.childNodes) {
      if (element.type === "text" && element.value === "") {
        validation = false;
      }
    }
    if (form.firstElementChild.children[1].value === "") {
      validation = false;
    }
    if (validation) {
        form.lastElementChild.lastElementChild.disabled = false;
    }

    }
          // delete all button
          const handleDeleteAllClick = function (event) {
            const endangeredlistDisplay = document.querySelector('#endangeredlist-display');
            endangeredlistDisplay.innerHTML = '';
  }