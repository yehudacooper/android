
//Imitation for DB

class Client {
    firstName;
    lastName;
    ID;
}

class Transaction {
    ID;
    AccountId;
    Type;   // Deposit / Withdraw    הפקדה/משיכה
    Amount;
}

class Account {
    ID;     //int
    ClientId;  //client class
    Balance;    //int
}

function rnd(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


let BankDb = {
    Clients : [],
    Accounts : [],
    Transactions : [],
    API : {
        getAccountById : function(accId){
            for (let i = 0; i < BankDb.Accounts.length; i++) {
                if (BankDb.Accounts[i].ID == accId) {
                    return BankDb.Accounts[i];
                }
            }
        },//end getAccountById

        //רשימת פעולות לפי חשבון
        getTransactionsByAccountId : function(accId){
            let tArr = []
            for (let i = 0; i < BankDb.Transactions.length; i++) {
                if (BankDb.Transactions[i].AccountId == accId) {
                    tArr.push(BankDb.Transactions[i]);
                }
            }
            return tArr;
        },//end getTransactionsByAccountId
        
        getBalance : function(accId){
            //let acc = BankDb.API.getAccountById(accId)
            let tranz = BankDb.API.getTransactionsByAccountId(accId)
            let balance = 0;
            tranz.forEach(t => balance += t.Amount);
            return balance;
        },//end getBalance

        getCliendById(clientID){
            for (let i = 0; i < BankDb.Clients.length; i++) {
                if (BankDb.Clients[i].ID == clientID) {
                    return BankDb.Clients[i];
                }
            }
        },//end getCliendByAccountId
    }//end API
};//end BankDb



(function initDB(){
    for (let c = 3; c < 8; c++) {
        let client = new Client();
        client.ID = c*5125;
        //65-90 = 35
        let letter = String.fromCharCode(rnd(25)+65);
        client.firstName = 'israel ' + letter + letter;
        client.lastName = 'Mr. weiss ' + letter + letter + letter;
        BankDb.Clients.push(client)
    }

    for (let a = 3; a < 16; a++) {
        let acc = new Account();
        acc.ID = a;
        let clientIndex = rnd(5);
        acc.ClientId = BankDb.Clients[clientIndex].ID;
        BankDb.Accounts.push(acc)
    }

    for (let i = 3; i < 116; i++) {
        let t = new Transaction();
        t.ID = i;
        t.Type = rnd(2) == 1 ? 'Deposit' : 'Withdraw'
        t.Amount = rnd(4000);
        if (t.Type == 'Withdraw') {
            t.Amount *= -1;
        }

        let accountIndex = rnd(13);
        t.AccountId = BankDb.Accounts[accountIndex].ID;
        BankDb.Transactions.push(t)
    }

    BankDb.Accounts.forEach(acc => 
        acc.Balance = BankDb.API.getBalance(acc.ID));

})();