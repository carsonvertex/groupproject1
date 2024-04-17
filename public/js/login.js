//This is use for control 'Year' in the Sign Up form 
const currentYear = new Date().getFullYear();
const startYear = currentYear - 100; // Change the range as needed
const yearSelect = document.getElementById('dobYear');

for (let year = currentYear; year >= startYear; year--) {
  const option = document.createElement('option');
  option.value = year;
  option.text = year;
  yearSelect.appendChild(option);
}
//This is use for control 'Day' in the Sign Up form 
const daySelect = document.getElementById('dobDay');
const days = Array.from({ length: 31 }, (_, index) => index + 1);

days.forEach(day => {
  const option = document.createElement('option');
  option.value = day;
  option.text = day;
  daySelect.appendChild(option);
});

//This is use for control 'Buttons' in the Sign Up form 
const JoinButton = document.querySelector('#Join')
const SignInButton = document.querySelector('#SignIn')
const LogoButton = document.querySelector('.logo')



LogoButton.addEventListener('click', function () {
  console.log("logo")
})


JoinButton.addEventListener('click', function () {
  console.log("sign up")

})


SignInButton.addEventListener('click', function () {
  console.log("SignIn")

})







