const incorrectElement = document.getElementById("incorrect");


const inputElements = document.querySelectorAll('.inputdata');

if (incorrectElement.textContent === "") {
  incorrectElement.style.display = 'none';
} else {
  incorrectElement.style.display = 'block';
  for ( const inputElement of inputElements){
  inputElement.style.borderColor = 'red';
  }
}
