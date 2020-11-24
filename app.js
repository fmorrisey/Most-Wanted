"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults= searchByTraits(people);
      // TODO: search by traits 
      break;
      default:
    app(people); // restart app
      break;
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
  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'spouse', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
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

function searchByTraits(people) {
  let gender = promptFor("What is the person's gender (male/female)?'", chars);  
  let height = promptFor("What is the person's height (inches)?'", chars);  
  let weight = promptFor("What is the person's weight (lbs)?'", chars);  
  let eyeColor = promptFor("What is the person's eye Color?'", chars);  
  
  let foundPeople = people.filter(function(person){
    if(person.gender === gender 
      || person.height === height
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
    if(currentPerson[0].id === person.currentSpouse){
      return true;
    }
    else {
      return false;
    }
  })
  return foundSpouse; 
}


// search for person's descendants  
function searchForDescendants(currentPerson, people){
  let foundChildren = people.filter(function(person){
    if(currentPerson[0].id === person.parents[0] || currentPerson[0].id=== person.parents[1]){
      return true; //
    }
    else{
      return false;
    }
  })
  
  return foundChildren;
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
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo+="gender: "+person[0].gender + "\n";
  personInfo += "dob: " + person[0].dob + "\n";
  personInfo += "height: " + person[0].height + "\n";
  personInfo += "weight: " + person[0].weight + "\n";
  personInfo += "eyeColor: " + person[0].eyeColor + "\n";
  personInfo += "occupation " + person[0].occupation + "\n";
  personInfo += "parents " + person[0].parents + "\n";
  personInfo += "currentSpouse " + person[0].currentSpouse + "\n";
  
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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}