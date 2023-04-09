const carBrands = {
    none: ["не выбрана..."],
    opel: ["Astra", "Mokka"],
    reno: ["Duster", "Logan"],
    mazda: ["MX 30", "CX 5"],
    jaguar: ["F-type", "E-PACE"], 
  };
  const form = document.form;
  const carBrand = document.getElementById("car-brand");
  const carModel = document.getElementById("car-model");

  const totalCost = document.querySelector(".total-cost");
  const button = document.querySelector('.button');
  const resetButton = document.querySelector('.reset-button');

  let brandCoefficient;
  let fuelCoefficient;
  let engineCapacityCoefficient;
  let conditionCoefficient;

  window.onload = selectModel;
  carBrand.onchange = selectModel;
  
  //SELECT MODEL
  function selectModel(){
    carModel.innerHTML = "";
    var c = this.value || "none", o;
    for(let i = 0; i < carBrands[c].length; i++){
      o = new Option(carBrands[c][i],carBrands[c][i],false,false);
      carModel.add(o);
    };
  }

  //BRAND RATE
  function rateBrand() {
    if (carBrand.value == "opel" || carBrand.value == "reno" ) {
      brandCoefficient = 20;
    }
    else brandCoefficient = 50;
    return brandCoefficient;
  };

  //FUEL RATE
  function rateFuel() {
    const radioFuel = document.querySelector('input[name="fuel"]:checked');
    if (radioFuel.value == 'gas') {
        fuelCoefficient = 1.5;
    }
    else if (radioFuel.value == 'diesel' || radioFuel.value == 'gasoline') {
        fuelCoefficient = 2;
    }
    else {
    fuelCoefficient = 3;
    }
    return fuelCoefficient;
  };

 
  //CAPACITY RATE 
  function rateCapacity() {
    const radioCapacity = document.querySelector('input[name="engine-capacity"]');

    if (radioCapacity.value >=2) {
        engineCapacityCoefficient = 5;
    }
    else {
    engineCapacityCoefficient = 2;
    }
    return engineCapacityCoefficient;
  };

  //CONDITION RATE
  function rateCondition() {
    const radioCondition = document.querySelector('input[name="condition"]:checked');
    const radioOwners = document.querySelector('input[name="owners"]:checked');

    if (radioCondition.value == "new") {
        conditionCoefficient = 10;
    }
    else if (radioOwners.value == "less") {
        conditionCoefficient = 5;
    }
    else conditionCoefficient = 2;

    return conditionCoefficient;

  };

   //SHOW CHECK NOTE
   let showCheckNote = () => {
    const radioCapacity = document.querySelector('input[name="engine-capacity"]');
    const hiddenDiv = document.getElementById("hidden");
    if (radioCapacity.value > 3.5 || radioCapacity.value < 1.1) {
      hiddenDiv.style.display="";
      radioCapacity.value="";
    }
    else hiddenDiv.style.display="none";
  };

  //SHOW OWNERS RADIO
  let showOwnersRadio = () => {
    const radioOwners = document.querySelector('input[name="condition"]:checked');
    const hiddenDiv = document.getElementById("owners-radio");
    if (radioOwners.value == 'used') {
        hiddenDiv.style.display="";
    }
    else hiddenDiv.style.display="none";
  }
    //CHECK BRAND AND SHOW MESSAGE
  let checkBrandChoice = () => {
    let span = document.getElementById('hidden-brand-msg');
    if (carBrand.value == "none") {
        span.style.display="";
    }
    else span.style.display="none";
  };


  //COUNT PRICE (base * ...)
  function countPrice() {
  totalCost.innerText = 50000 * (fuelCoefficient + engineCapacityCoefficient + conditionCoefficient + brandCoefficient);
  };


  button.addEventListener('click', function(evt) {
    evt.preventDefault();
    checkBrandChoice ();
    if (carBrand.value !== "none") {
    rateBrand()   
    rateFuel();
    rateCapacity();
    rateCondition();
    countPrice();
    }
  });

  //RESET FORM
  resetButton.addEventListener('click', function() {
    form.reset();
    totalCost.innerText ="";
  });



  //ЗАДАНИЕ ПОД ЗВЕЗДОЧКОЙ
  console.log(/^(20\d\d|20\d\d|2100)$/.test('2000'));
  let result = "asdffgs ghjk".replace(/\W*\w*(\w)\1\w*\W*/g, " "); 
  console.log(result);
  let result2 = "jh ggg ggg ggg jhjh".replace(/\b(\w+)\b(?:\s+\1\b)+/g, "$1");
  console.log(result2);