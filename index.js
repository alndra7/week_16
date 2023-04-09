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
      o = new Option(carBrands[c][i],i,false,false);
      carModel.add(o);
    };
  }

  //FUEL RATE
  function rateFuel () {
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



  //COUNT PRICE (base * ...)
  function countPrice() {
  totalCost.innerText = 50000 * (fuelCoefficient + engineCapacityCoefficient + conditionCoefficient);
  };


  button.addEventListener('click', function(evt) {
    evt.preventDefault();
    rateFuel();
    rateCapacity();
    rateCondition();

    countPrice();
  });

  //RESET FORM
  resetButton.addEventListener('click', function() {
    form.reset();
    totalCost.innerText ="";
  });