let myList = []
let saveList = []

let content = document.getElementById("content")
let nom = document.getElementById("nom")
let nb_groups = document.getElementById("nb_groups")
let add_student = document.getElementById("add_student")
let make_groups = document.getElementById("make_groups")
let tab_list = document.getElementById("tab_list")
let tab_groups = document.getElementById("tab_groups")

add_student.addEventListener("click",e=>{

    if(nom.value.trim()=="") {
        alert("Veuillez saisir le prénom de l'Etudiant SVP !!!")
    }
    else{
        saveList.push(nom.value)

        let tr_list = document.createElement("tr")

        let td_name = document.createElement("td")
        td_name.innerText = nom.value

        let a = document.createElement("a")
        a.setAttribute("href","#")
        a.innerText = "X"

        a.addEventListener("click",e=>{
            let row = e.target.parentNode.parentNode
            let td_row = row.firstChild
            let item = td_row.innerText
            let index = saveList.indexOf(item)
            console.log(`${index} : ${item}`)
            saveList.splice(index,1)
            console.log(saveList)
            row.remove()
        })

        let td_a = document.createElement("td")
        td_a.appendChild(a)

        tr_list.appendChild(td_name)
        tr_list.appendChild(td_a)

        tab_list.appendChild(tr_list)
        nom.value = ""   
    }
})

function print(array = []){
    str_list = ""
    array.forEach(function(item){
        str_list += item + "<br>"
    })
    return str_list
}

make_groups.addEventListener("click",function(){

    if(nb_groups.value.trim()=="" || 
        typeof(nb_groups.value.trim())==NaN ||
        Number(nb_groups.value.trim())==0){

            alert("Veuillet saisir un nombre entier > 0 SVP !!!")
            nb_groups.value = ""

        }

    else{

        myList = saveList.slice(0,saveList.length)

        let myGroups = []
        let max_nb_groups = Math.round(saveList.length / Number(nb_groups.value))
        let i = 0

        if(tab_groups.hasChildNodes()) tab_groups.remove()

        tab_groups = document.createElement("table")
        tab_groups.setAttribute("id","tab_groups")
        tab_groups.innerHTML = `<tr>
                                    <th>Groupes</th>
                                    <th>Etudiants</th>
                                </tr>`
        content.appendChild(tab_groups)

        while(myList.length > 0){

            i++
            let newGroup = []

            for(j=0;j<max_nb_groups;j++){

                if(myList.length>0){
                    let choice = Math.floor(Math.random()*myList.length)
                    let name = myList[choice]
                    newGroup.push(name)
                    myList.splice(choice,1)                    
                }

            }

            let tr_groups = document.createElement("tr")
            tr_groups.innerHTML =  `<td>Groupe n° ${i}</td>
                                    <td>${print(newGroup)}</td>`
            tab_groups.appendChild(tr_groups)
            myGroups.push(newGroup)

        }    
        console.log(myGroups)

    }
})