document.onreadystatechange = function(ev){
    if (document.readyState == "complete") {
        console.log('i am ready - ready state');
        bankStart();
    
        // accountDetails();
    } 
}

function customersAccount(){
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

function bankStart(){
    document.querySelector('.customers-list').innerHTML = render(templates.customers, BankDb.Clients)
    let customersDiv = document.querySelectorAll('.customers');
    customersDiv.forEach(div =>{div.onclick = function(event){
          console.log(event);
          let customerDiv = event.target.closest('.customers');
          let idSpan = customerDiv.querySelector('span').innerHTML;
          let currentAccounts = [];
          BankDb.Accounts.forEach(t => {if(t.ClientId == idSpan){
            currentAccounts.push(t);  
          }})
          let accountsCustomArray = []
          currentAccounts.forEach(acc => {
              let myClient = BankDb.API.getCliendById(acc.ClientId)
              let o = {
                  ID : acc.ID,
                  Balance : acc.Balance,
                  ClientId : acc.ClientId,
                  ClientFullName : myClient.lastName + ' ' + myClient.firstName
              }
              accountsCustomArray.push(o)
          });
          document.querySelector('.accounts-list').innerHTML = render(templates.account,accountsCustomArray)
          document.querySelector(".details-panel").innerHTML = "";
         accountDetails();
        }})}
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
          let idSpan = accountDiv.querySelector('span').innerHTML;
          let currentTrans = [];
          BankDb.Transactions.forEach(t => {if(t.AccountId == idSpan){
              currentTrans.push(t);  
          }})
          document.querySelector('.details-panel').innerHTML = render(templates.accountDetails,currentTrans)
        }})

    // }})
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
        <div> <label>Amount: </label> <span>[Amount]</span> </div></div>`,

    customers : `<div class="customers">
    <div> <label>ID: </label> <span>[ID]</span> </div>
    <div> <label>first name: </label> <span>[firstName]</span> </div>
    <div> <label>last name: </label> <span>[lastName]</span> </div>
     </div>`    
}

// class Transaction {
//     ID;
//     AccountId;
//     Type;   // Deposit / Withdraw    הפקדה/משיכה
//     Amount;
// }