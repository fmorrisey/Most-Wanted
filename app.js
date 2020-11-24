"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo)
    .toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    
    case 'no':
      traitsOrCriteria(people);
      break;
      
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  if (searchResults.length === 1) {
    mainMenu(searchResults[0], people);
  } else {
    displayPeople(searchResults);
  }
}

function traitsOrCriteria(people){
  
  let displayOption = promptFor("Search by 'traits' or 'criteria'", chars).toLowerCase();
  
  switch(displayOption){
      
      case 'traits':
        searchResults= searchByTraits(people);
        displayPeople(searchResults);
        return app(people);
        break;

      case 'criteria':
        searchResults= searchByCriteria(people);
        displayPeople(searchResults);
        return app(people);
        break;
        
        default:
          return traitsOrCriteria(person, people); // ask again

  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);

}



// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  var currentPerson = person;

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + 
      " . Do you want to know their 'info', 'spouse', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
      displayP(person);
      return mainMenu(person, people);
    break;
    
    case "family":
      var family = searchForFamily(currentPerson, people);
      displayPerson(family);
      return mainMenu(person, people);

    break;
    
    case "spouse":
      var spouse = searchForSpouse(currentPerson, people);
      displayPerson(spouse);
      return mainMenu(person, people);
    break;
    
    case "descendants":
      var children = searchForDescendants(currentPerson, people);
      displayPeople(children);
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
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  //add so that search queries are matched the data set
  firstName = firstName.capitalize(); 
  lastName = lastName.capitalize();
  
  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// Search for person by individual criteria
function searchByCriteria(people){

  let criteria = promptFor("What criteria would you like to search on: 'gender' , 'eye color' , 'height' , 'weight' ", chars).toLowerCase();
    
    switch(criteria){
      
      case "gender":
        var result = searchByGender(people);
        displayPeople(result);
      break;
              
      case "eye color":
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
      
      default:
        return searchByCriteria(people);
    }

    return app(people);
}


// Search for person by gender
function searchByGender(people){

  let gender = promptFor("Please enter 'male' or 'female'", maleFemale);
    
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPerson;
}

// Search for person by eye color
function searchByEyeColor(people) {

  let eyeColor = promptFor("Please enter 'green', 'blue', 'hazel', 'brown' or  black'", chars);

  let foundPerson = people.filter(function (person) {
    if (person.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  })

  return foundPerson;
}

// Search for person by height
function searchByHeight(people){

  let height = promptFor("Please enter height in inches", nums);
    
  let foundPerson = people.filter(function(person){
    if(person.height === height){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPerson;
}

// Search for person by weight lbs
function searchByWeight(people){

  let gender = promptFor("Please enter weight in lbs", nums);
    
  let foundPerson = people.filter(function(person){
    if(person.weight === weight){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPerson;
}

// Search for person by occupation
function searchByOccupation(people){

  let gender = promptFor("Please enter person's Occupation", chars);
    
  let foundPerson = people.filter(function(person){
    if(person.Occupation === Occupation){
      return true;
    }
    else{
      return false;
    }
  })

  return foundPerson;
}


function searchByTraits(people) {
  let gender = promptFor("What is the person's gender (male/female)?'", maleFemale);  
  let height = promptFor("What is the person's height (inches)?'", nums);  
  let weight = promptFor("What is the person's weight (lbs)?'", nums);  
  let eyeColor = promptFor("What is the person's eye color?'", chars);  
  
  let foundPeople = people.filter(function(person){
    if(person.gender === gender){
      
        return true;
    }
    else{

      return false;
    }
  })

  foundPeople = foundPeople.filter(function(person){
    if(person.height === height
      || person.weight === weight
      || person.eyeColor === eyeColor){
      
        return true;
    }
    else{

      return false;
    }
  })
 
  return foundPeople;

}
// Search for person's spouse
function searchForSpouse(currentPerson, people){
  
  let foundSpouse = people.filter(function(person){
    if(currentPerson.id === person.currentSpouse){
      return true;
    }
    else {
      return false;
    }
  })
  return foundSpouse; 
}


// search for person's descendants  
function searchForDescendants(currentPerson, people, descendants = []){
    
  let foundChildren = people.filter(function(person){
    if(currentPerson.id === person.parents[0] || currentPerson.id=== person.parents[1]){
      return true; //
    }
    else{
      return false;
    }
  })
  
  for (let i = 0; i < foundChildren.length; i++) {
    const child = foundChildren[i];
    descendants.push(child);  //add each
    searchForDescendants(child, people, descendants);
  }
  
  return descendants;
}

// function checkNotFound(people){
//   if (people === undefined || people.length === 0){
//     people.firstName = "Not";
//     people.lastName = "Found";
//   }
//   return people;
//}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo+="gender: "+person.gender + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "occupation " + person.occupation + "\n";
  personInfo += "parents " + person.parents + "\n";
  personInfo += "currentSpouse " + person.currentSpouse + "\n";
  
  //  REP Done! TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass into promptFor to validate male/female answers
function maleFemale(input){
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

// helper function to pass in as default promptFor validation
function chars(input){
  var code, i, len;

  for (i = 0, len = input.length; i < len; i++) {
    code = input.charCodeAt(i);
    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}


// helper function to pass in as defaults promptFor validation
function nums(input){
  var code, i, len;

  for (i = 0, len = input.length; i < len; i++) {
    code = input.charCodeAt(i);
    if (!(code > 47 && code < 58)){ // numeric (0-9)
      return false;
    }
  }
  return true;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}