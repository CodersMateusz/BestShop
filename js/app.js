function Calculator(form, summary) {
  this.prices = {
    products: 1.5,
    orders: 0.5,
    package: {
      basic: 0,
      professional: 25,
      premium: 60
    },
    accounting: 15,
    terminal: 5
  };

  this.form = {
    products: form.querySelector('#products'),
    orders: form.querySelector('#orders'),
    package: form.querySelector('#package'),
    accounting: form.querySelector('#accounting'),
    terminal: form.querySelector('#terminal')
  };

  this.summary = {
    list: summary.querySelector('ul'),
    items: summary.querySelector('ul').children,
    total: {
      container: summary.querySelector('#total-price'),
      price: summary.querySelector('.total__price')
    }
  };

  this.addEvents();
}


Calculator.prototype.inputEvent = function(e) {
  const id = e.currentTarget.id;
  const value = e.currentTarget.value;

  const singlePrice = this.prices[id];
  const totalPrice = singlePrice * value;

  this.updateSummary(id, value + ' $' + singlePrice, totalPrice, function (item, calc, total){
    if (value < 0) {
      calc.innerHTML = null;
      total.innerHTML = `Value should be greater than 0`;
    }
    if (value.length === 0) {
      item.classList.remove('show');
    }
  });
  this.updateTotal();
};

Calculator.prototype.updateSummary = function (id, calc, price, callback) {
  const summary = this.summary.list.querySelector(`[data-id=${id}]`);
  const summaryCalc = summary.querySelector('.item__calc');
  const summaryTotal = summary.querySelector('.item__price');
  summary.classList.add('show');

  if (summaryCalc !==null) {
    summaryCalc.innerHTML = calc;
  }
    summaryTotal.innerHTML = `$${price}`;

  if (typeof callback === 'function') {
    callback(summary, summaryCalc, summaryTotal);
  }
};

Calculator.prototype.selectEvent = function (e) {
  this.form.package.classList.toggle('show');

  const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
  const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

  if (value.length > 0) {
    this.form.package.dataset.value = value;
    this.form.package.querySelector('.select__input').innerHTML = text;

    this.updateSummary('package', text, this.prices.package[value]);
  };
  this.updateTotal();
};

Calculator.prototype.checkboxEvent = function (e) {
  const checkbox = e.currentTarget;
  const id = checkbox.id;
  const checked = e.currentTarget.checked;

  this.updateSummary(id, undefined, this.prices[id], function (item){
    if (!checked) {
      item.classList.remove('show');
    }
  });
  this.updateTotal();
};

Calculator.prototype.addEvents = function () {
  this.form.products.addEventListener("change", this.inputEvent.bind(this));
  this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
  this.form.orders.addEventListener("change", this.inputEvent.bind(this));
  this.form.orders.addEventListener("keyup", this.inputEvent.bind(this));

  this.form.package.addEventListener("click", this.selectEvent.bind(this));

  this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
  this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
};

Calculator.prototype.updateTotal = function () {
  const show = this.summary.list.querySelectorAll('.show').length > 0;

  if (show) {
    this.summary.total.container.classList.add('show');
    const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
    const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
    const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
    const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
    const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

    this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);
  } else {
    this.summary.total.container.classList.remove('show');
  }

};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".calc__form");
  const summary = document.querySelector(".calc__summary");

  new Calculator(form, summary);
});



// const productsInput = document.querySelector("#products");
// const ordersInput = document.querySelector("#orders");
// const package = document.querySelector("#package");
// const selectInput = document.querySelector("#package .select__input");
// const dropdown = document.querySelector(".select__dropdown");
// const dropdownList = document.querySelectorAll(".select__dropdown li");
// const checkboxAccounting = document.querySelector("#accounting");
// const checkboxRental = document.querySelector("#terminal");
// const productsSummary = document.querySelector('[data-id = "products"]');
// const productsCalcSpan = document.querySelectorAll(
//   '[data-id = "products"] span'
// )[1];
// const productsPriceSpan = document.querySelectorAll(
//   '[data-id = "products"] span'
// )[2];
// const ordersSummary = document.querySelector('[data-id = "orders"]');
// const ordersCalcSpan = document.querySelectorAll(
//   '[data-id = "orders"] span'
// )[1];
// const ordersPriceSpan = document.querySelectorAll(
//   '[data-id = "orders"] span'
// )[2];
// const packageSummary = document.querySelector('[data-id = "package"]');
// const packageType = document.querySelectorAll('[data-id = "package"] span')[1];
// const packagePrice = document.querySelectorAll('[data-id = "package"] span')[2];
// const accoutingSummary = document.querySelector('[data-id = "accounting"]');
// const accountingPrice = document.querySelector('[data-id = "accounting"] .item__price');
// const rentalSummary = document.querySelector('[data-id = "terminal"]');
// const rentalPrice = document.querySelector('[data-id = "terminal"] .item__price')
// const totalBox = document.querySelector('#total-price');
// const totalCalc = document.querySelector('.total__price');
// const calcList = document.querySelectorAll('.calc__summary ul li');




// //start prices
// const productsPrice = 1.5;
// let productsCalc = 0;
// let productsTotal = 0;
// const ordersPrice = 0.5;
// let ordersCalc = 0;
// let ordersTotal = 0;
// const acc = 15;
// const rental = 5;
// const packagePrices = {
//   basic: 0,
//   professional: 25,
//   premium: 60
// }
// // end prices


// productsInput.addEventListener("change", function () {
//   if (productsInput.value % 1 == 0 && productsInput.value > 0) {
//     productsTotal = productsInput.value * productsPrice;
//     productsSummary.classList.add('show');
//     productsCalcSpan.innerHTML = `${productsInput.value} * $${productsPrice}`;
//     productsPriceSpan.innerHTML = `$${productsTotal}`;
//   } else if (
//     !productsInput.value ||
//     productsInput.value % 1 !== 0 ||
//     productsInput.value <= 0
//   ) {
//     productsSummary.classList.remove('show');
//   }
//   totalUpdate();
// });

// ordersInput.addEventListener("change", function () {
//   if (ordersInput.value % 1 == 0 && ordersInput.value > 0) {
//     ordersTotal = ordersInput.value * ordersPrice;
//     ordersSummary.classList.add('show');
//     ordersCalcSpan.innerHTML = `${ordersInput.value} * $${ordersPrice}`;
//     ordersPriceSpan.innerHTML = `$${ordersTotal}`;  
//   } else if (
//     !ordersInput.value ||
//     ordersInput.value % 1 !== 0 ||
//     ordersInput.value <= 0
//   ) {
//     ordersSummary.classList.remove('show');
//   }
//   totalUpdate();
// });

// package.addEventListener("click", function (e) {
//   dropdown.classList.toggle("show");
  
//   const value = e.target.dataset.value;
//   const text = e.target.innerText;

//   if (value.length > 0) {
//     package.dataset.value = value;
//     selectInput.innerText = text;
//     packageType.innerText = text;
//     packageSummary.classList.add('show');
//     packagePrice.innerHTML = `$${packagePrices[value]}`;
//   };
//   totalUpdate();
// });

// checkboxAccounting.addEventListener('change', function (){
//   if (checkboxAccounting.checked) {
//     accoutingSummary.classList.add('show');
//     accountingPrice.innerHTML = `$${acc}`;
//   } else {
//     accoutingSummary.classList.remove('show');
//   }
//   totalUpdate();
// })

// checkboxRental.addEventListener('change', function (){
//   if (checkboxRental.checked) {
//     rentalSummary.classList.add('show');
//     rentalPrice.innerHTML = `$${rental}`
//   } else {
//     rentalSummary.classList.remove('show');
//   }
//   totalUpdate();
// });


// const totalUpdate = () => {
//   const show = document.querySelectorAll('.calc__summary ul .show').length > 0;
//   if (show) {
//     const productSum = productsInput.value * productsPrice;
//     const ordersSum = ordersInput.value * ordersPrice;
//     const packageSum = packagePrices[package.dataset.value];
//     const accSum = acc;
//     const rentalSum = rental;

//     totalCalc.innerHTML = `$${productSum + ordersSum + packageSum + accSum + rentalSum}`;
//     totalBox.classList.add('show');
//   } else {
//     totalBox.classList.remove('show');
//   }
// }


