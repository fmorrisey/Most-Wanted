"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;

    case "no":
      traitsOrCriteria(people);
      break;

    default:
      app(people); // restart app
      break;
  }

  if (searchResults.length === 1) {
    mainMenu(searchResults[0], people);
  } else if (searchResults.length === 0) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
}

function traitsOrCriteria(people) {
  let displayOption = promptFor(
    "Search by 'traits' or 'criteria'",
    chars
  ).toLowerCase();

  switch (displayOption) {
    case "traits":
    case "trait":
      var searchResults = searchByTraits(people);
      displayPeople(searchResults);
      return app(people);
      break;

    case "criteria":
    case "cri":
      searchByCriteria(people);
      break;

    default:
      return traitsOrCriteria(person, people); // ask again
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  var currentPerson = person;

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person.firstName +
      " " +
      person.lastName + 
      ". \n" + 
      "Do you want to know their: 'info', 'spouse', 'parents', 'siblings', 'antecedents', " +
      "'family', or 'descendants'? \n" + "Type the option you want or enter 'restart' or 'quit'",
    chars
  );

  switch (displayOption) {
    case "info":
      displayPerson(person, people);
      return mainMenu(person, people);
      break;

    case "family":
      searchForFamily(currentPerson, people);
      return mainMenu(person, people);
      break;

    case "spouse":
      var spouse = searchForSpouse(currentPerson, people);
      displaySpouse(currentPerson, spouse, people);
      return mainMenu(person, people);
      break;

    case "parents":
      var parents = searchForParents(currentPerson, people);
      displayPeople(parents);
      return mainMenu(person, people);
      break;

    case "siblings":
    case "sibs":
      var siblings = searchForSiblings(currentPerson, people);
      displayPeople(siblings);
      return mainMenu(person, people);
      break;

    case "antecedents":
    case "ante":
      var ante = searchForAntecedents(currentPerson, people);
      displayPeople(ante);
      return mainMenu(person, people);
      break;

    case "descendants":
    case "desc":
      var desc = searchForDescendants(currentPerson, people);
      displayPeople(desc);
      return mainMenu(person, people);
      break;

    case "restart":
      app(people); // restart
      break;

    case "quit":
      return; // stop execution

    default:
      return mainMenu(person, people); // ask again
  }
}

// Search for person by first/last name
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  //add so that search queries are matched the data set
  firstName = firstName.capitalize();
  lastName = lastName.capitalize();

  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    } else {
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson;
}

// Search for person by individual criteria
function searchByCriteria(people) {
  let criteria = promptFor(
    "What criteria would you like to search on: 'gender' , 'eyecolor' , 'height' , 'weight' , 'restart'",
    chars
  ).toLowerCase();

  switch (criteria) {
    case "gender":
      var result = searchByGender(people);
      displayPeople(result);
      break;

    case "eyecolor":
      var result = searchByEyeColor(people);
      displayPeople(result);
      break;

    case "height":
      var result = searchByHeight(people);
      displayPeople(result);
      break;

    case "weight":
      var result = searchByWeight(people);
      displayPeople(result);
      break;

    case "occupation":
      var result = searchByOccupation(people);
      displayPeople(result);
      break;

    case "restart":
      app(people); // restart
      break;

    default:
      return searchByCriteria(people);
  }

  return app(people);
}

// Search for person by gender
function searchByGender(people) {
  let gender = promptFor("Please enter 'male' or 'female'", maleFemale);

  let foundPerson = people.filter(function (person) {
    if (person.gender === gender) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

// Search for person by eye color
function searchByEyeColor(people) {
  let eyeColor = promptFor(
    "Please enter 'green', 'blue', 'hazel', 'brown' or  black'",
    chars
  );

  let foundPerson = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

// Search for person by height
function searchByHeight(people) {
  let height = parseInt(promptFor("Please enter height in inches", nums));

  let foundPerson = people.filter(function (person) {
    if (person.height === height) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

// Search for person by weight lbs
function searchByWeight(people) {
  let weight = parseInt(promptFor("Please enter weight in lbs", nums));

  let foundPerson = people.filter(function (person) {
    if (person.weight === weight) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

// Search for person by occupation
function searchByOccupation(people) {
  let gender = promptFor("Please enter person's Occupation", chars);

  let foundPerson = people.filter(function (person) {
    if (person.Occupation === Occupation) {
      return true;
    } else {
      return false;
    }
  });

  return foundPerson;
}

function searchByTraits(people) {
  let gender = promptFor(
    "What is the person's gender (male/female)?'",
    maleFemale
  );
  let height = promptFor("What is the person's height (inches)?'", nums);
  let weight = promptFor("What is the person's weight (lbs)?'", nums);
  let eyeColor = promptFor("What is the person's eye color?'", eyeCInput);

  let foundPeople = people.filter(function (person) {
    if (person.gender === gender) {
      return true;
    } else {
      return false;
    }
  });

  foundPeople = foundPeople.filter(function (person) {
    if (
      person.height === height ||
      person.weight === weight ||
      person.eyeColor === eyeColor
    ) {
      return true;
    } else {
      return false;
    }
  });

  return foundPeople;
}

// Search for person's spouse
function searchForSpouse(currentPerson, people) {
  let foundSpouse = people.filter(function (person) {
    if (currentPerson.id === person.currentSpouse) {
      return true;
    } else {
      return false;
    }
  });
  return foundSpouse;
}

// search for person's descendants
function searchForDescendants(currentPerson, people, descendants = []) {
  let foundChildren = people.filter(function (person) {
    if (
      currentPerson.id === person.parents[0] ||
      currentPerson.id === person.parents[1]
    ) {
      return true; //
    } else {
      return false;
    }
  });

  for (let i = 0; i < foundChildren.length; i++) {
    const child = foundChildren[i];
    descendants.push(child); //add each
    searchForDescendants(child, people, descendants);
  }

  return descendants;
}

// search for person's descendants
function searchForAntecedents(currentPerson, people, lineage = []) {
  let foundParents = people.filter(function (person) {
    if (
      currentPerson.parents[0] === person.id ||
      currentPerson.parents[0] === person.id ||
      currentPerson.parents[1] === person.id ||
      currentPerson.parents[1] === person.id
    ) {
      return true; //
    } else {
      return false;
    }
  });

  for (let i = 0; i < foundParents.length; i++) {
    const parent = foundParents[i];
    lineage.push(parent); //add each
    searchForAntecedents(parent, people, lineage);
  }

  return lineage;
}

function searchForParents(currentPerson, people) {
  let foundParents = people.filter(function (person) {
    if (
      currentPerson.parents[0] === person.id ||
      currentPerson.parents[0] === person.id ||
      currentPerson.parents[1] === person.id ||
      currentPerson.parents[1] === person.id
    ) {
      return true; //
    } else {
      return false;
    }
  });

  return foundParents;
}

function searchForSiblings(currentPerson, people) {
  if (currentPerson.parents[0] === undefined) {
    return [];
  } else {
    let foundSiblings = people.filter(function (person) {
      if (
        currentPerson.parents[0] === person.parents[0] ||
        currentPerson.parents[0] === person.parents[1] ||
        currentPerson.parents[1] === person.parents[0] ||
        currentPerson.parents[1] === person.parents[1]
      ) {
        return true; //
      } else {
        return false;
      }
    });

    return foundSiblings;
  }
}

function searchForFamily(currentPerson, people) {
  let spouse = searchForSpouse(currentPerson, people);
  let siblings = searchForSiblings(currentPerson, people);
  let descendants = searchForDescendants(currentPerson, people);
  let antecedents = searchForAntecedents(currentPerson, people);

  alert(
    spouse
      .map(function (person) {
        return "Spouse is: \n" + person.firstName + " " + person.lastName;
      })
      .join("\n") +
      "\n\nSiblings are: \n" +
      siblings
        .map(function (person) {
          return person.firstName + " " + person.lastName;
        })
        .join("\n") +
      "\n\nDescendants are: \n" +
      descendants
        .map(function (person) {
          return person.firstName + " " + person.lastName;
        })
        .join("\n") +
      "\n\nAntecedents are: \n" +
      antecedents
        .map(function (person) {
          return person.firstName + " " + person.lastName;
        })
        .join("\n") +
      "\n"
  );
}

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}


function displaySpouse(currentPerson, spouse, people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  if (Array.isArray(spouse)) {
    spouse = spouse[0];
  }
  if (Array.isArray(currentPerson)) {
    currentPerson = currentPerson[0];
  }

  let personInfo = 
    "Spouse Name: " + spouse.firstName + " " + spouse.lastName + "\n"
  + "Gender: " + spouse.gender + "\n"
  + "DOB: " + spouse.dob + "\n"
  + "Height: " + spouse.height + "\n"
  + "Weight: " + spouse.weight + "\n"
  + "Eye Color: " + spouse.eyeColor + "\n"
  + "Occupation " + spouse.occupation + "\n";
  
  if (spouse.parents[0] === undefined) {
    personInfo += "Parents: Not found \n";
  } else {
    let parents = searchForParents(spouse, people);
    personInfo += "Parents: " + parents[0].firstName + " & " + parents[1].firstName 
  + " " + parents[1].lastName + "\n";
  }
    
  //  REP Done! TODO: finish getting the rest of the information to display
  alert(personInfo);
}


function displayPerson(person, people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  if (Array.isArray(person)) {
    person = person[0];
  }

  let personInfo = "INFORMATION: \n"
  + "Name: " + person.firstName + " " + person.lastName + "\n"
  + "Gender: " + person.gender + "\n"
  + "DOB: " + person.dob + "\n"
  + "Height: " + person.height + "\n"
  + "Weight: " + person.weight + "\n"
  + "Eye Color: " + person.eyeColor + "\n"
  + "Occupation " + person.occupation + "\n";
  if (person.parents[0] === undefined) {
    personInfo += "Parents: Not found \n";
  } else {
    let parents = searchForParents(person, people);
    personInfo += "Parents: " + parents[0].firstName + " & " + parents[1].firstName 
  + " " + parents[1].lastName + "\n";
  }

  if (person.currentSpouse === null) {
    personInfo += "Spouse: Not found \n";
  } else {
    let spouse = searchForSpouse(person, people);
    personInfo += "Spouse: " + spouse[0].firstName + " " + spouse[0].lastName;
  }
  
  alert(personInfo);
}


// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));

  return response;
}

// helper function to pass into promptFor to validate eye color answers
function eyeCInput(input) {
  return (
    input.toLowerCase() == "hazel" ||
    input.toLowerCase() == "brown" ||
    input.toLowerCase() == "black" ||
    input.toLowerCase() == "blue" ||
    input.toLowerCase() == "green"
  );
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass into promptFor to validate male/female answers
function maleFemale(input) {
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  var code, i, len;

  for (i = 0, len = input.length; i < len; i++) {
    code = input.charCodeAt(i);
    if (
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

// helper function to pass in as defaults promptFor validation
function nums(input) {
  var code, i, len;

  for (i = 0, len = input.length; i < len; i++) {
    code = input.charCodeAt(i);
    if (!(code > 47 && code < 58)) {
      // numeric (0-9)
      return false;
    }
  }
  return true;
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
