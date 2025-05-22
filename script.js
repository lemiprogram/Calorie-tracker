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
    addCalorieInps: document.querySelectorAll(".addCalorieInps"),
    addFoodInps: document.querySelectorAll(".addFoodInps"),
    addExerciseInps: document.querySelectorAll(".addExerciseInps"),

    personalInfoInps: document.querySelector("#personalInfoInps "),
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
    inpInfoSection: document.querySelectorAll(".inpInfoSection"),
    surplusSection: document.querySelector("#surplusSection"),
    deficeitSection: document.querySelector("#deficeitSection"),
    currentWeightSection: document.querySelector("#currentWeightSection"),
    startWeightSection: document.querySelector("#startWeightSection"),
    filterdSurplusSection: document.querySelector(".filterdSurplusSection"),
    filterdDeficeitSection: document.querySelector(".filterdDeficeitSection"),
    dailyCalorieList: document.querySelector("#dailyCalorieList"),
    allTimeCalorieList: document.querySelector("#allTimeCalorieList"),
    inpInfoModal:document.querySelector("#inpInfoModal"),
  },
  values: {
    lbsToKg: 2.205,
    caloriesToKg:7700,
  }
};
  !localStorage.getItem("calorieArr")?localStorage.setItem("calorieArr",JSON.stringify([])):console.log(JSON.parse(localStorage.getItem("calorieArr")))

const allTimeCalorieArr = JSON.parse(localStorage.getItem("calorieArr"))

const renderPage = ()=>{
  localStorage.setItem("calorieArr",JSON.stringify(allTimeCalorieArr))
  const surplus = calcSurplus()
  document.querySelector(".surplus-val").innerHTML = `${surplus}`
  document.querySelector("table tBody").innerHTML = allTimeCalorieArr.map(item=>`
     <tr>
       <td>${item.type}</td>
       <td>${item.calories}</td>
       <td><div class="delete-item btn rounded-full bg-primary-100 text-bg-100" id="item-${item.id}" onclick="deleteItem(this)">Delete</div></td>
     </tr> 
    `).join("")
}
//addinp ~ this function adds an input field.
// The section para is the location of the input field.
// The isSet para dictates whether the inp overwrites the innerHTML or if it is just concatenated into the section
// The labelText para is the text within the label.
// The type para is the type of input field it is.
const addInpFunc = (section, isSet = false,labelText = "", pHolder1="food", type = "text") => {
    const inp = document.createElement("div");
    inp.classList.add("infoInp","relative","flex","gap-3","text-text-100","flex-col","border-1","border-dotted","border-black","rounded-2xl")
    inp.innerHTML += `
            <label className="text-text-200" >${labelText}</label>
            <input type="${type}" class="${pHolder1}" placeholder="${pHolder1}">
            ${pHolder1!=="food"?'<input type="${type}" class="calories" placeholder="Calories">':''}
            <div class="deleteCalorieInpBtn ">X</div>
            <p class="text-red-600"></p>

        `;
    if (isSet) {
      section.innerHTML = inp;
    } 
    else {
      section.appendChild(inp);
      inp.querySelector(".deleteCalorieInpBtn").addEventListener("click", e=>removeElFunc(e.target.parentElement))
    }
}
//removeEl ~ removes elements from the document
// The el para this the element of choice
const removeElFunc = (el) => el.remove()
//addArrInfo ~ add info to an array
//The arr para is the array that will receive the values
//The arr para is the array that will receive the values
const addArrInfoFunc = async (type,isConsumed = true, arr=allTimeCalorieArr) =>{
    const res = fetchCalories(type,arr,arr.length)
    const calories = await res.then(data=>data.items[0].calories)

    arr.push({
      id: arr.length,
      date: new Date(),
      type,
      isConsumed,
      calories
    })
    renderPage()
    console.log(arr)
  }
const fetchCalories = async (food) =>{
  const apiUrl = 'https://api.calorieninjas.com/v1/nutrition?query=' + encodeURIComponent(food)
    const apikey = "YADsPSTNERVw1KAv8GMB5A==sPBTa5zAqiRZ451r"
    return await fetch(apiUrl,{
        method: 'GET',
        headers: { 'X-Api-Key': `${apikey}`},
        contentType: 'application/json',
     })
    .then(res=>{
        if(!res.ok){
          console.log("This is the issue:")
        }
        return res.json()
        // myClass para is the class given to the 
    })
    .catch(err=>console.error(err))
  }
// removeArrInfo ~ removes info from an array
// The arr para is the array 
// The index para is the index of the item to be removed 
const removeArrInfoFunc =(arr,index)=>arr[index] = ""
// addArrPersonalInfo ~ adds the personal infomation of the user and saves it into an object 
// The name para is the name of the user
// The dob para is the date of birth of the user
// The height para is the height of the user
//  The weight para is the weight of the user. It is saved in an array as the weight will keep changing
const addArrPersonalInfoFunc =(name,dob,height,weight)=>{
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
    
}
//toggleMyClass~ toggles through a class on the el1 and el2 elements
//el1 and el2 are parameteres representing two seperate elements

const toggleMyClassFunc =(myClass,el1)=>{
    el1.classList.toggle(myClass)
}

function  calcSurplus  (arr=allTimeCalorieArr){ 
  const calories = arr.map(obj=>obj.calories)
  return calories.reduce((acc,item)=>acc+item,0)
}
function deleteItem(e){
  const index = Number(e.id.slice(5))
  allTimeCalorieArr.length>1?allTimeCalorieArr.splice(index,1):allTimeCalorieArr.pop()
  renderPage()
}
function showModal(){
  toggleMyClassFunc("hidden",inpInfoModal)
  
}
function resetArr(arr){
  arr =[]
  renderPage()
}
const {btns,inps,sections,values} = docVariables;

btns.addFoodInpBtn.addEventListener("click",e=>{
    addInpFunc(sections.foodInpSection,false,"Add a Food")
})
/* btns.addExerciseInpBtn.addEventListener("click",e=>{
    addInpFunc(sections.exerciseInpSection,false,"Add an Exercise and Its Calories")
}) */
btns.addInfoBtn.addEventListener("click",()=>{
  let arr = []
  let isEmptyValue = false;
  const infoInps  = Array.from(sections.inpInfoSection)
  infoInps.forEach((inp)=>{
    for(item of inp.children){
      const type = item.querySelector("input");
      addArrInfoFunc(type.value)
      
    }
    foodInpSection.innerHTML = ``
    toggleMyClassFunc("hidden",inpInfoModal) 

  })
})
window.onclick = event=>{
  if(event.target === inpInfoModal){
    showModal()
  }
}
renderPage()