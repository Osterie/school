class Contact {
    constructor(first_name, last_name, phone, email) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.phone = phone;
      this.email = email;
    }
  
    add_adress(zip_code, city, street_adress_1, street_adress_2) {
      this.zip_code = zip_code;
      this.city = city;
      this.street_adress_1 = street_adress_1;
      this.street_adress_2 = street_adress_2;
    }
  
    add_birthday(birthday) {
      this.birthday = birthday;
    }
  }
  
class SportMember extends Contact {
    constructor(first_name, last_name, phone, email, sport, team) {
        super(first_name, last_name, phone, email)
        this.sport = sport;
        this.team = team;
        this.active = true
        this.paid = false
    }
    active_status(active){
        this.active = active
    }
    paid_status(paid){
        this.paid = paid
    }
}

class MusicMember extends Contact {
    constructor(first_name, last_name, phone, email, instrument) {
        super(first_name, last_name, phone, email)
        this.instrument = instrument;
        this.active = true
        this.available = true
    }
    active_status(active){
        this.active = active
    }
    available_status(available){
        this.available = available
    }
}


class Organisation{
    constructor(){
        this.members_list = []
    }

    add_member(member){

        if (!this.members_list.includes(member)){
            this.members_list.push(member)
        }

    }
    show_members(){
        for (let i = 0; i < this.members_list.length; i++) {
            console.log(this.members_list[i].first_name, this.members_list[i].last_name)            
        }
    }

}
  
  
class Orchestra extends Organisation{

    constructor(group){
        super()
        this.group = group
        this.members_list = []
    }

}

class HandballTeam extends Organisation{
    constructor(club){
        super()
        this.club = club
        this.members_list = []
    }
}


window.onload = winInit;

function winInit() {

    let orchestra = new Orchestra("The Earthworms")

    let orchestra_member1
    let orchestra_member2
    let orchestra_member3
    let orchestra_member4
    let orchestra_member5

    orchestra_member1 = new MusicMember("Adrian", "Bjørge", "999 88 999", "adrian@mail.com", "fiolin")
    orchestra_member2 = new MusicMember("Joa", "nordal", "999 88 999", "test@mail.com", "harpe")
    orchestra_member3 = new MusicMember("Tobias", "sørdal", "777 88 777", "test@mail.com", "piano")
    orchestra_member4 = new MusicMember("Antonio", "vestdal", "666 88 666", "test@mail.com", "fiolin")
    orchestra_member5 = new MusicMember("Benni", "østdal", "444 88 444", "test@mail.com", "piano|")
    orchestra.add_member(orchestra_member1)
    orchestra.add_member(orchestra_member2)
    orchestra.add_member(orchestra_member3)
    orchestra.add_member(orchestra_member4)
    orchestra.add_member(orchestra_member5)


    const add_member_button = document.getElementById("add_member_button");
    const feedback_element = document.getElementById("placeholder_feedback")
    
    const show_members_button = document.getElementById("vis_medlemmer");
    const show_members_element = document.getElementById("placeholder_show_members")

    const member_informations = ["first_name", "last_name", "phone", "email", "instrument"]

    add_member_button.addEventListener("click", function () {
        
        const first_name = document.getElementById("input_fornavn").value;
        const last_name = document.getElementById("input_etternavn").value;
        const phone_number = document.getElementById("input_tlf").value;
        const email = document.getElementById("input_email").value;
        const instrument = document.getElementById("input_instrument").value;

        let orchestra_member

        if(!first_name && !last_name){
            feedback_element.innerHTML = "Navn er obligatorisk, vennligst fyll feltene"
        }
        else{
            orchestra_member = new MusicMember(first_name, last_name, phone_number, email, instrument)
            orchestra.add_member(orchestra_member)
            feedback_element.innerHTML = "Medlem lagt til i orkesteret!"
        }
            
        orchestra.show_members()
    });

    show_members_button.addEventListener("click", function(){

        show_members_element.innerHTML = ""

        for (let i = 0; i < orchestra.members_list.length; i++) {
            show_members_element.innerHTML += (i+1) +". "

            for (let j = 0; j <member_informations.length; j++) {
                show_members_element.innerHTML += orchestra.members_list[i][member_informations[j]] + ", "
            }
            show_members_element.innerHTML += "<br></br>"
        }
        orchestra.show_members()
    })
}