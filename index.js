var globalCollegeResults = []; //globally assigning to use the data

//Function called to parse the csv file to load data using Papaparse to globally access
const selCollege = () => {
  Papa.parse("Developer - Take home assignment college_costs.csv", {
    download: true,
    complete: function (results) {
      globalCollegeResults = results;
    },
  });
};
selCollege();

//Function called when page loads
function loadData() {
  let select = document.getElementById("collegeName");
  
  //mapping results data to the dynamically rendered select dropdown
  globalCollegeResults.data.map((collegeName, i, arr) => {
    let option = document.createElement("option");
    option.value = arr[i][0];
    option.text = arr[i][0];
    select.appendChild(option);
  });
  document.getElementById("container").appendChild(select);
}

//Function to display the fee details upon college selection
function selectedCollegeName() {
  document.getElementById("feeContainer").style.display = "flex";

  document.getElementById("inStateCheck").disabled = false; //enabling the checkbox and radio buttons with default selection
  document.getElementById("outStateCheck").disabled = false;
  document.getElementById("roomBoardCheck").disabled = false;

  let collegeNameSel = document.getElementById("collegeName").value;
  let collegeName = globalCollegeResults.data.filter(
    (r) => r[0] === collegeNameSel
  ); //filtering to get the fee details in regards to the college selection

  let inStateFee = collegeName[0][1];
  let outStateFee =
    collegeName[0][2] !== "" ? collegeName[0][2] : collegeName[0][1];
  let roomBoardFee = collegeName[0][3];
  document.getElementById("roomBoard").value = roomBoardFee;

  var totalFee;
  let roomBoardCheck = document.getElementById("roomBoardCheck").checked;
  let inStateTuitionFee = document.getElementById("inStateCheck").checked;
  let outStateTuitionFee = document.getElementById("outStateCheck").checked;

  if (inStateTuitionFee) {
    //default state fee for out State set to in State Fee when out State is not mentioned
    document.getElementById("inState").value = inStateFee;
  } else document.getElementById("inState").value = outStateFee;

  /*Displaying the fees upon the conditions checked and calculating annual fee */
  if (inStateTuitionFee && roomBoardCheck) {
    totalFee = parseInt(inStateFee, 10) + parseInt(roomBoardFee, 10);
  } else if (outStateTuitionFee && roomBoardCheck) {
    totalFee = parseInt(outStateFee, 10) + parseInt(roomBoardFee, 10);
  } else if (inStateTuitionFee && !roomBoardCheck) {
    totalFee = parseInt(inStateFee, 10);
  } else if (outStateTuitionFee && !roomBoardCheck) {
    totalFee = parseInt(outStateFee, 10);
  }

  document.getElementById("totalFee").value = "$ " + totalFee;
}
