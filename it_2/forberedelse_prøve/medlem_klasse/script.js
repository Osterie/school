 class Contact {
  constructor(first_name, last_name, phone, email) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
  }

  adress(zip_code, city, street_adress_1, street_adress_2) {
    this.zip_code = zip_code;
    this.city = city;
    this.street_adress_1 = street_adress_1;
    this.street_adress_2 = street_adress_2;
  }

  birthday(birthday) {
    this.birthday = birthday;
  }
}


class Member extends Contact {
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
// console.log(new Member("Adrian", "Bjørge", 986, "a@shit", "football", "ELL"))

class Sports_team{
    constructor(club){
        this.club = club
        this.members_list = []
    }

    add_member(member){

        if (!this.members_list.includes(member)){
            this.members_list.push(member)
        }
    }
    show_member_info(){
        for (let i = 0; i < this.members_list.length; i++) {
            // console.log(this.members_list[i])            
            console.log(this.members_list[i].first_name, this.members_list[i].last_name)            
        }
    }
}

const hessa_sports_team = new Sports_team("Hessa IL")

const member_1 = new Member("Adrian", "Bjørge", "479 51 978", "joachi@gmail.com", "Football", "G19")
const member_2 = new Member("Luna", "Kretschmer", "479 52 979", "luna@gmail.com", "Football", "J19")

hessa_sports_team.add_member(member_1)
hessa_sports_team.add_member(member_2)

hessa_sports_team.show_member_info()