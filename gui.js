<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Account Objects</title>

    <body>
        <form>
            <table style="background-color:#66b3ff">
                <tr>
                    <td>First Name:<input type="text" id="fname" value=""> Last Name:<input type="text" id="lname" value=""></td>
                    <td><input type="button" value="Add" onclick="add()"></td>
                </tr>
                <tr>
                    <td><input type="button" value="Summary" onclick="listAllAccts()"></td>
                    <td><input type="button" value="Details" onclick="listAllAcctsBilling()"></td>
                </tr>
                <tr>
                    <td colspan="2"><select id="listbox" size=9 STYLE="overflow:scroll;  width: 600px"></select></td>
                </tr>
                <tr>
                    <td>$<input type="number" id="payment" value="0"><input type="button" value="Pay" onclick="newPayment()"></td>
                    <td>$<input type="number" id="charge" value="0"><input type="button" value="Charge" onclick="newCharge()"></td>
                </tr>
            </table>
        </form>
        <p id="log"></p>



        <script>
            /*Functionality of Button Controls:

            Add: creates a new account object initialized to the values in the input boxs

            Summary: lists all accounts and balance in the select box

            Details: lists all accounts, balance, and all transactions in the select box, and also to the "log" placeholder

            Pay:  adds a credit to the selected select-box account, if no account is selected then nothing happens

            Charge: applys a charge to the selected select-box account, if no account is selected then nothing happens

            */


            var accounts = []; //

            // accountObj declaration
            function accountObj(fname = "?", lname = "?") {
                // Properties:
                this.fname = fname;
                this.lname = lname;
                this.acctNum = "#" + accounts.length;
                this.balanceDue = 0.00;
                this.balanceHistory = "";
                document.getElementById("log").innerHTML += ("<br>Account Created: " + this.fname +" " +this.lname);
				this.addCharge = function(type,amount) {
				this.balanceDue -= amount;
				this.balanceHistory += type+" charge: " +amount + "<br>";
				document.getElementById("log").innerHTML += ("<br>"+type+" "+"-"+amount);
				return true;
					}
                // Methods:
            }

            // functions for GUI Event Handlers
            // these match up directly with the GUI button controls
            function listAllAccts() {
                document.getElementById("listbox").innerHTML = "";


                for (i = 0; i < accounts.length; i++) {
                    var x = document.getElementById("listbox");
                    var option = document.createElement("option");
                    option.text = ("Account_" + accounts[i].acctNum + "_" + accounts[i].fname + "_" + accounts[i].lname + "_" + accounts[i].balanceDue.toFixed(2));
                    x.add(option);


                }


            }

            // display account summaries to 2 places:
            // the select box, the 'log' placeholder

            function listAllAcctsBilling() {
              document.getElementById("listbox").innerHTML = "";


              for (i = 0; i < accounts.length; i++) {
                  var x = document.getElementById("listbox");
                  var option = document.createElement("option");
                  option.text = ("Account_" + accounts[i].acctNum + "_" + accounts[i].fname + "_" + accounts[i].lname + "_" + accounts[i].balanceDue.toFixed(2)+accounts[i].balanceHistory);
                  x.add(option);
                // display account summaries and billing details to 2 places:
                // the select box, the 'log' placeholder
            }
          }

            function add() {
                // add a new account
                // get the values for first and last name out of text field:
                var firstName = document.getElementById("fname").value;
                var lastName = document.getElementById("lname").value;
                accounts.push(new accountObj(firstName, lastName));
                document.getElementById("log").innerHTML += ("<br>Account Added: " + firstName + " " + lastName);
                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";

                // add a new account object to the accounts array
            }

            function newPayment() {
                var personPayment = document.getElementById("payment").value;
                newPayment.personPayment = parseFloat(personPayment);
                var person = document.getElementById("listbox").selectedIndex;
                accounts[person].balanceDue += newPayment.personPayment;
                document.getElementById("log").innerHTML += ("<br>Payment Made: " + accounts[person].fname + " " + accounts[person].lname + "_Amount:+" + personPayment);
                document.getElementById("payment").value = "";
                document.getElementById("listbox").innerHTML = "";




                // get the selected account object from the list
                // get the dollar value from the text field
                // make the payment
            }

            function newCharge() {
				var freq;
                var personCharge = document.getElementById("charge").value;
                newCharge.personCharge = parseFloat(personCharge);
                var person = document.getElementById("listbox").selectedIndex;

			accounts[person].balanceDue -= newCharge.personCharge;
                document.getElementById("log").innerHTML += ("<br>Charge Made: " + accounts[person].fname + " " + accounts[person].lname + "_Amount:-" + newCharge.personCharge);


                document.getElementById("charge").value = "";
                document.getElementById("listbox").innerHTML = "";
                // get the selected account object from the list
                // get the dollar value from the text field
                // make the charge
            }



            // generate some test accounts:
            accounts.push(new accountObj("Dana", "Green"));
            accounts.push(new accountObj("Lana", "White"));
            accounts.push(new accountObj("Karl", "Brown"));
            accounts.push(new accountObj("Chevy", "Silver"));
            accounts.push(new accountObj("Van", "Red"));

            // generate monthly bills:
            for (i = 0; i < accounts.length; i++) {
                accounts[i].addCharge("Monthly",45.99);

            }
        </script>

    </body>

    </html>
