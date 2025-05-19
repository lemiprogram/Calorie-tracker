const docVariables = {
  btns: {
    addCalorieInpBtn: document.querySelector("#addCalorieInpBtn"),
    addFoodInpBtn: document.querySelector("#addFoodInpBtn"),
    addExerciseInpBtn: document.querySelector("#addExerciseInpBtn"),
    deleteCalorieInpBtn: document.querySelector(".deleteCalorieInpBtn"),

    addInfoBtn: document.querySelector("#addInfoBtn"),
    showAddInfoBtn: document.querySelector("#showAddInfoBtn"),
    savePersonalInfoBtn: document.querySelector("#savePersonalInfoBtn"),
    changePersonalInfoBtn: document.querySelector("#changePersonalInfoBtn"),
  },
  inps: {
    inpInfoSection: document.querySelector("#inpInfoSection input"),
    addCalorieInps: document.querySelectorAll(".addCalorieInps"),
    addFoodInps: document.querySelectorAll(".addFoodInps"),
    addExerciseInps: document.querySelectorAll(".addExerciseInps"),

    personalInfoInps: document.querySelectorAll("#personalInfoInps input"),
    nameInp: document.querySelector("#nameInp"),
    dobInp: document.querySelector("#dobInp"),
    heightInp: document.querySelector("#heightInp"),
    weightInp: document.querySelector("#weightInp"),
    heightMetricsInp: document.querySelector("#heightMetricsInp"),
    weightMetricsInp: document.querySelector("#weightMetricsInp"),
  },
  sections: {
    foodInpSection: document.querySelector("#foodInpSection"),
    calorieInpSection: document.querySelector("#calorieInpSection"),
    exerciseInpSection: document.querySelector("#exerciseInpSection"),
    surplusSection: document.querySelector("#surplusSection"),
    deficeitSection: document.querySelector("#deficeitSection"),
    currentWeightSection: document.querySelector("#currentWeightSection"),
    startWeightSection: document.querySelector("#startWeightSection"),
    filterdSurplusSection: document.querySelector(".filterdSurplusSection"),
    filterdDeficeitSection: document.querySelector(".filterdDeficeitSection"),
    dailyCalorieList: document.querySelector("#dailyCalorieList"),
    allTimeCalorieList: document.querySelector("#allTimeCalorieList"),
  },
  values: {
    lbsToKg: 2.205,
    caloriesToKg:7700,
  }
};

const docFunctions = {
    //addinp ~ this function adds an input field.
    // The section para is the location of the input field.
    // The isSet para dictates whether the inp overwrites the innerHTML or if it is just concatenated into the section
    // The labelText para is the text within the label.
    // The type para is the type of input field it is.
    addInpFunc: (section, isSet = false,labelText = "", pHolder1="food",pHolder2="Calories", type = "text") => {
        const inp = document.createElement("div");
        inp.classList.add("relative","flex","gap-3","text-text-100","flex-col","border-1","border-dotted","border-black","rounded-2xl")
        inp.innerHTML += `
                <label className="text-text-200" >${labelText}</label>
                <input type="${type}" class="${pholder1}" placeholder="${pHolder1}">
                <input type="${type}" className="" placeholder="${pHolder2}">
                <div class="deleteCalorieInpBtn">X</div>

            `;
        if (isSet) {
          section.innerHTML = inp;
        } 
        else {
          section.appendChild(inp);
          document.querySelector(".deleteCalorieInpBtn").addEventListener("click", e=>docFunctions.removeElFunc(e.target.parentElement))
        }
    },
    //removeEl ~ removes elements from the document
    // The el para this the element of choice
    removeElFunc: (el) => el.remove(),
    //addArrInfo ~ add info to an array
    //The arr para is the array that will receive the values
    //The arr para is the array that will receive the values
    addArrInfoFunc: (arr, exerciseCalories,food, foodCalories) =>
        arr.push({
        id: arr.length,
        date: new Date(),
        exerciseCalories,
        food,
        foodCalories
        }),
    // removeArrInfo ~ removes info from an array
    // The arr para is the array 
    // The index para is the index of the item to be removed 
    removeArrInfoFunc:(arr,index)=>arr[index] = "",
    // addArrPersonalInfo ~ adds the personal infomation of the user and saves it into an object 
    // The name para is the name of the user
    // The dob para is the date of birth of the user
    // The height para is the height of the user
    //  The weight para is the weight of the user. It is saved in an array as the weight will keep changing
    addArrPersonalInfoFunc:(name,dob,height,weight)=>{
        return {
                name,
                dob,
                age:function(){
                    const thisYear = new Date().getFullYear();
                    const birthYear = new Date(this.dob).getFullYear();
                    return thisYear - birthYear
                },
                height,
                weight:[weight]
        }
        
    },
    //toggleMyClass~ toggles through a class on the el1 and el2 elements
    //el1 and el2 are parameteres representing two seperate elements
    // myClass para is the class given to the 

    toggleMyClassFunc:(myClass,el1,el2=null)=>{
        el1.classList.toggle(myClass)
        el2?el2.classList.toggle(myClass):"";
    }
};


const {btns,inps,sections,values} = docVariables;
const { addInpFunc, removeElFunc, addArrInfoFunc, removeArrInfoFunc, addArrPersonalInfoFunc, toggleMyClassFunc} = docFunctions

btns.addFoodInpBtn.addEventListener("click",e=>{
    addInpFunc(sections.foodInpSection,false,"Add a Food and Its Caloies")
    console.log("its working")
})
btns.addExerciseInpBtn.addEventListener("click",e=>{
    addInpFunc(sections.exerciseInpSection,false,"Add an Exercise and Its Caloies")
})
