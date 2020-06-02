document.onreadystatechange = function(ev){
    if (document.readyState == "complete") {
        console.log('i am ready - ready state');
        bankStart();
        accountDetails();
    } 
}

function bankStart(){
    console.log('bankStart');

    //document.querySelector('.accounts-list').innerHTML = shukiRender(templates.account, BankDb.Accounts)
    let accountsCustomArray = []
    BankDb.Accounts.forEach(acc => {
        let myClient = BankDb.API.getCliendById(acc.ClientId)
        let o = {
            ID : acc.ID,
            Balance : acc.Balance,
            ClientId : acc.ClientId,
            ClientFullName : myClient.lastName + ' ' + myClient.firstName
        }
        accountsCustomArray.push(o)
    });

    document.querySelector('.accounts-list').innerHTML = render(templates.account, accountsCustomArray)

}

/*
class Account {
    ID;     //int
    ClientId;  //client class
    Balance;    //int

    class Client {
    firstName;
    lastName;
    ID;
}
}*/
function accountDetails(){
    let accountsDiv = document.querySelectorAll('.account');
    accountsDiv.forEach(div =>{div.onclick = function(event){
          console.log(event);
          let accountDiv = event.target.closest('.account');
          let idSpan = accountDiv.querySelector('span').textContent;
          let currentTrans = [];
          BankDb.Transactions.forEach(t => {if(t.AccountId == idSpan){
              currentTrans.push(t);  
          }})
          document.querySelector('.details-panel').innerHTML = render(templates.accountDetails,currentTrans)

    }})
   

}

let templates = {
    account : `<div class="account">
        <div> <label>ID: </label> <span>[ID]</span> </div>
        <div> <label>ClientFullName: </label> <span>[ClientFullName]</span> </div>
        <div> <label>ClientId: </label> <span>[ClientId]</span> </div>
        <div> <label>Balance: </label> <span>[Balance]</span> </div>
    </div>`,
    accountDetails : `<div class="account-details">
        <div> <label>ID: </label> <span>[ID]</span> </div>
        <div> <label>AccountId: </label> <span>[AccountId]</span> </div>
        <div> <label>Type: </label> <span>[Type]</span> </div>
        <div> <label>Amount: </label> <span>[Amount]</span> </div></div>`
}

// class Transaction {
//     ID;
//     AccountId;
//     Type;   // Deposit / Withdraw    הפקדה/משיכה
//     Amount;
// }