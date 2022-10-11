
class Lanfin {
        constructor( value, method, accountid, category){
            this.value = value;
            this.method = method;
            this.accountid = accountid;
            this.category = category;
        }
}

class Account {
        constructor(number, agency, name, type){
                this.number = number;
                this.agency = agency;
                this.name = name;
                this.type = type;
        }
}

module.exports.convertLanfin = function (req, met){
        return new Lanfin(req.body.value.substring(),req.body.method.substring(),req.body.accountid.substring(),req.body.category.substring());
}

module.exports.convertAccount = function(req) {
        return new Account (req.body.number.substring(), req.body.agency.substring(), req.body.name.substring(), req.body.type.substring());
}
