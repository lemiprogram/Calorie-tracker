const docVariables = {
    btns:{
        addCalorieInpBtn:document.querySelector("#addCalorieInpBtn"),
        addFoodInpBtn:document.querySelector("#addFoodInpBtn"),
        addExerciseInpBtn:document.querySelector("#addExerciseInpBtn"),
        deleteCalorieInpBtn:document.querySelector("#deleteCalorieInpBtn"),
        deleteFoodInpBtn:document.querySelector("#deleteFoodInpBtn"),
        deleteExerciseInpBtn:document.querySelector("#deleteExerciseInpBtn"),
        addFoodBtn:document.querySelector("#addFoodBtn"),
        
    },
    inps:{
        addCalorieInp:document.querySelectorAll(".addCalorieInp"),
        addFoodInp:document.querySelectorAll(".addFoodInp"),
        addExerciseInp:document.querySelectorAll(".addExerciseInp"),
        deleteCalorieInp:document.querySelectorAll(".deleteCalorieInp"),
        deleteFoodInp:document.querySelectorAll(".deleteFoodInp"),
        deleteExerciseInp:document.querySelectorAll(".deleteExerciseInp"),
        nameInp:document.querySelectorAll(".nameInp"),
        ageInp:document.querySelectorAll(".ageInp"),
        heightInp:document.querySelectorAll(".heightInp"),
        weightInp:document.querySelectorAll(".weightInp"),
        heightMetricsInp:document.querySelectorAll(".heightMetricsInp"),
        weightMetricsInp:document.querySelectorAll(".weightMetricsInp"),
    },
    sections:{
        foodInpSection:document.querySelector(".foodInpSection"),
        calorieInpSection:document.querySelector(".calorieInpSection"),
        exerciseInpSection:document.querySelector(".exerciseInpSection"),
        surplusSection:document.querySelectorAll(".surplusSection"),
        deficeitSection:document.querySelectorAll(".deficeitSection"),
        currentWeightSection:document.querySelectorAll(".currentWeightSection"),
        startWeightSection:document.querySelectorAll(".startWeightSection"),
        filterdSurplusSection:document.querySelectorAll(".filterdSurplusSection"),
        filterdDeficeitSection:document.querySelectorAll(".filterdDeficeitSection"),
    }
}

const docFunctions = {
    //addinp ~ this function adds an input field.
        // The section para is the location of the input field.
        // The isSet para dictates whether the inp overwrites the innerHTML or if it is just concatenated into the section
        // The labelText para is the text within the label.
        // The type para is the type of input field it is.
    addInp:(section,isSet=false, labelText = "", type ="text")=>{
        inp = document.createElement("div")
        inp.innerHtml = `
            <label >${labelText}</label>
            <input type="${type}">

        `
        if(isSet){
            section.innerHtml = inp
        }
        else{
            section.appendChild(inp)
        }
    },
    

}