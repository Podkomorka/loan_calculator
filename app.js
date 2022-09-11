// Listen for submit, triggers if this form is submitted
document.getElementById('loan-form').addEventListener('submit', function(e){
  document.getElementById('loading').style.display = 'block';
  document.getElementById('results').style.display = 'none';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// FUNCTION: Calculate Results
function calculateResults(){
  document.getElementById('loading').style.display = 'none';

  // Grab all stuff from UI that we need
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Do he calculations
  const principal = parseFloat(amount.value); // Get amount value as a decimal
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // ___ to the power of ___
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  // only display results if nothing went wrong, or throw and error
  if(isFinite(monthly)){
    // sets UI to our calculated value at 2 decimal places
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
  } else {
    // only shows an error message if there isnt already one, prevent spamming error message
    if(document.querySelector('.card').firstElementChild.className !== 'alert alert-danger'){
      showError('Please check your numbers');    
    }
  }
}

// Show Error
function showError(error){
  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading, insertBefore takes a parent and inserts before a child
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}