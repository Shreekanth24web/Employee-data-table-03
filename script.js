let newAddMemberBtn = document.querySelector(".addMemberBtn")
let darkBg = document.querySelector(".dark_bg")
let popup = document.querySelector(".popup")
let closeBtn = document.querySelector(".closeBtn")
let submitBtn = document.querySelector(".submitBtn")
let popupFooter = document.querySelector(".popupFooter")
let modalTitle = document.querySelector(".modalTitle")

let imgInput = document.querySelector(".img")
let uploadImg = document.getElementById("uploadimg")

let form = document.getElementById("myForm")
let fNameInput = document.getElementById("fName")
let lNameInput = document.getElementById("lName")
let ageInput = document.getElementById("age")
let cityInput = document.getElementById("city")
let positionInput = document.getElementById("position")
let salaryInput = document.getElementById("salary")
let sDateInput = document.getElementById("sDate")
let emailInput = document.getElementById("email")
let phoneInput = document.getElementById("phone")
let tableData = document.querySelector(".tableData")

let formInputFields = document.querySelectorAll('form input')


let originalData = localStorage.getItem("userProfileData") ? JSON.parse(localStorage.getItem("userProfileData")) : []
console.log(originalData)

let isEdit = false, editId


newAddMemberBtn.addEventListener("click", () => {
      submitBtn.innerHTML = "Submit"
      modalTitle.innerHTML = "Fill the Form"
      popupFooter.style.display = "block"
      modalTitle.style.color=""

      imgInput.src = "./img/Profile_Img-2.png"
      darkBg.classList.add('active')
      popup.classList.add('active')
      
})

closeBtn.addEventListener("click", () => {
      darkBg.classList.remove('active')
      popup.classList.remove('active')
      form.reset()
})

uploadImg.onchange = () => {
      if (uploadImg.files[0].size < 1000000) {
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                  imgUrl = e.target.result
                  imgInput.src = imgUrl
            }
            fileReader.readAsDataURL(uploadImg.files[0])
      } else {
            alert("File is to large!")
      }
}


let showInfo = () => {
      document.querySelectorAll(".userElements").forEach(info => info.remove())
      originalData.map((elem, i) => {
            let createElement = `
            <tr class="userElements">
                  <td> ${i + 1}</td>
                  <td><img src="${elem.picture}" alt="showInfo_img_Error" width="50" height="50"></td>
                  <td> ${elem.fNameVal + " " + elem.lNameVal}</td>
                  <td> ${elem.ageVal}</td>
                  <td> ${elem.cityVal}</td>
                  <td> ${elem.positionVal}</td>
                  <td> ${elem.salaryVal}</td>
                  <td> ${elem.sDateVal}</td>
                  <td> ${elem.emailVal}</td>
                  <td> ${elem.phoneVal}</td>
                  <td>
                        <button type="button" onclick="readInfo('${elem.picture}','${elem.fNameVal}','${elem.lNameVal}','${elem.ageVal}','${elem.cityVal}','${elem.positionVal}','${elem.salaryVal}','${elem.sDateVal}','${elem.emailVal}','${elem.phoneVal}')" ><i class="fa-regular fa-eye"></i></button>
                      
                        <button type="button" onclick="editInfo('${i}','${elem.picture}','${elem.fNameVal}','${elem.lNameVal}','${elem.ageVal}','${elem.cityVal}','${elem.positionVal}','${elem.salaryVal}','${elem.sDateVal}','${elem.emailVal}','${elem.phoneVal}')" ><i class="fa-regular fa-pen-to-square"></i></button>
                       
                        <button type="button" onclick="deleteInfo('${i}')" ><i class="fa-regular fa-trash-can"></i></button>
                  </td>
            </tr>`
            tableData.innerHTML += createElement;
      })
}
showInfo()

let readInfo = (pic, fname, lname, Age, City, Post, Salary, Date, Mail, Phone) => {

      profilePic.src = pic;
      fNameInput.value = fname
      lNameInput.value = lname;
      ageInput.value = Age;
      cityInput.value = City;
      positionInput.value = Post;
      salaryInput.value = Salary;
      sDateInput.value = Date;
      emailInput.value = Mail;
      phoneInput.value = Phone;

      submitBtn.innerHTML="none"
      modalTitle.innerHTML="User Profile"
      modalTitle.style.color="white"

      darkBg.classList.add('active')
      popup.classList.add('active')
      popupFooter.style.display = "none"

      formInputFields.forEach(input => {
            input.disabled = true
      })

}

let deleteInfo = (i) => {
      originalData.splice(i, 1)
      localStorage.setItem("userProfileData", JSON.stringify(originalData))
      showInfo()

}

let editInfo = (i, pic, fname, lname, Age, City, Post, Salary, Date, Mail, Phone) => {

      isEdit = true
      editId = i

      profilePic.src = pic;
      fNameInput.value = fname
      lNameInput.value = lname;
      ageInput.value = Age;
      cityInput.value = City;
      positionInput.value = Post;
      salaryInput.value = Salary;
      sDateInput.value = Date;
      emailInput.value = Mail;
      phoneInput.value = Phone;

      submitBtn.innerHTML="Update"
      modalTitle.innerHTML="Update the Form"
       
      darkBg.classList.add('active')
      popup.classList.add('active')
      popupFooter.style.display = "block"  
      
      formInputFields.forEach(input => {
            input.disabled = false
      })

}


form.addEventListener("submit", (e) => {
      e.preventDefault()
      let information = {
            id: Date.now(),
            picture: imgInput.src == undefined ? "img/Profile_img-2.png" : imgInput.src,
            fNameVal: fNameInput.value,
            lNameVal: lNameInput.value,
            ageVal: ageInput.value,
            cityVal: cityInput.value,
            positionVal: positionInput.value,
            salaryVal: salaryInput.value,
            sDateVal: sDateInput.value,
            emailVal: emailInput.value,
            phoneVal: phoneInput.value,
      }

      if (!isEdit) {
            originalData.unshift(information)
      }

      else {
            isEdit = false
            originalData[editId] = information
      }

      localStorage.setItem("userProfileData", JSON.stringify(originalData))


      submitBtn.innerHTML = "Submit"
      modalTitle.innerHTML = "Fill the Form"

      darkBg.classList.remove('active')
      popup.classList.remove('active')

      showInfo()
      form.reset()

})



