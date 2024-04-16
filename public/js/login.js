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

})


JoinButton.addEventListener('click', function () {
    const SignUpForm = `<div>
    <div>SIGN UP WITH...</div>
    <div class="Google">Google</div>
    <div>Signing up with social is super quick. No extra passwords to remember - no brain fail. Don't worry, we'd never
        share any of your data or post anything on your behalf #NotEvil</div>
</div>
<div>
    <div>OR SIGN UP WITH EMAIL</div>
    <div>
        <form action="/signup" method="POST">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required>
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <div>
            <label for="dobDay">Day:</label>
            <select id="dobDay" name="dobDay" required>
              <option value="">Day</option>
            </select>
          </div>
          <div>
            <label for="dobMonth">Month:</label>
            <select id="dobMonth" name="dobMonth" required>
              <option value="">Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div>
            <label for="dobYear">Year:</label>
            <select id="dobYear" name="dobYear" required>
              <option value="">Year</option>
            </select>
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>`

    const JoinForm = document.querySelectorAll('.LargeContainer')
    JoinForm.innerHTML += SignUpForm
    console.log(SignUpForm)

})


SignInButton.addEventListener('click', function () {
    console.log("SignIn")

})







