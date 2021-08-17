const sss = SpreadsheetApp.openById('1A1ILZkJW3NYK9Xh1nSpGwCLymKM5ZlMrIlAB9UoASBs')
const invSheet=sss.getSheetByName('Investors')
const histSheet=sss.getSheetByName('Payout History')
const monthSheet = sss.getSheetByName('Profit')
const pksss = SpreadsheetApp.openById('1oDNMEvBDjPaqsS0tGjK7SUdXFekQ2hdpEV9z_Xhzqqw')
const profitSheet = pksss.getSheetByName('months')
const expensesS=sss.getSheetByName('Expenses')
const dataS = sss.getSheetByName('Data')
function createTrigger(){
ScriptApp.newTrigger('button')
    // insert the file ID for the spreadsheet you'd like to edit
   .forSpreadsheet('1A1ILZkJW3NYK9Xh1nSpGwCLymKM5ZlMrIlAB9UoASBs')
   .onEdit()
   .create();
}
function monthlyPayouts() {
  var sendLines = invSheet.getRange('J3:J').getValues()
  //Logger.log(sendLines)
  for(i in sendLines){
    var line = sendLines[i]
    if(line!=""){histSheet.getRange(histSheet.getLastRow()+1,2).setValue(line)}
    }
  invSheet.getRange('J3:J').clearContent()
}

function autoReinvestment(){
  Logger.log('AutoReinvest')
  var nameList = invSheet.getRange('B3:B').getValues()
  var oldAmmountList = invSheet.getRange('C3:C').getValues()
  var ammountToReinvestList = invSheet.getRange('J3:J').getValues()
  var time = new Date
  var now = Utilities.formatDate(time,"GMT","HH:mm - dd/MM/YY")
  for(i in nameList){
    var name = nameList[i]
    if(name!=""){
      var old = oldAmmountList[i]
      var per = ammountToReinvestList[i]
      var ammount = Number(old)+Number(per)
      Logger.log('Name: '+name+'\nOld: '+old+'\nPer: '+per+'\nNew: '+ammount)
      if(Number(per)>0){
      var lastRow = Number(histSheet.getRange('M3').getValue())
      histSheet.getRange(lastRow+1,8).setValue(name)
      histSheet.getRange(lastRow+1,9).setValue(per)
      histSheet.getRange(lastRow+1,10).setValue(old)
      histSheet.getRange(lastRow+1,11).setValue(Number(ammount))
      histSheet.getRange(lastRow+1,12).setValue(now)
      
      var finder = invSheet.getRange('B:B').createTextFinder(name).findNext()
      var row = finder.getRowIndex()
      var n = Number(ammount)
      invSheet.getRange(row,3).setValue(Math.round(n))
      Logger.log(name+" Added to history with Ammount Reinvested of "+ammount)
      
      if(name=="Reserve Fund"){
        var rowExpenses = expensesS.getRange("K1").getValue()+1
        expensesS.getRange(rowExpenses,10,1,2).setValues([[ammount,"Ammount Earnt From Interest"]])
        var newReserve = expensesS.getRange("K3").getValue()
        invSheet.getRange(row,3).setValue(newReserve)
        }
      }
      }
    
    }
  
}

function button(e){
  var activeSheet =e.source.getActiveSheet()
  var range = e.range
  Logger.log('Got Range')
  //if(activeSheet.getName() == 'Investors' &&
//    e.range.columnStart == 10 &&
 //   e.range.columnEnd == 10 &&
  //  e.range.rowStart >= 3 &&
  //  e.range.rowEnd <= 5000
//    ){
 //   Logger.log('Ran')
//  monthlyPayouts()
//  }
  if(activeSheet.getName() == 'Investors' && e.range.getA1Notation() == 'M3'){
    invSheet.getRange('M4').setValue('RUNING.... DONT SPAM BUTTON')
    var a = invSheet.getRange("J1").getValue()
    var b = invSheet.getRange("H1").getValue()
    autoReinvestment()
    Logger.log('Ran')
    invSheet.getRange('M3').setValue('FALSE')
    invSheet.getRange('M4').setValue("Finished|Total To Be Paid Out: "+Utilities.formatString("$%.2f",b)+" |Total To be Reinvested: "+Utilities.formatString("$%.2f",a))
  }
}

function getPksProfits(){
// get total inv ammounts 
var tot = invSheet.getRange('C1').getValue()
Logger.log('Total Invested: '+tot)
// get PKs profit/loss for the month
var lastMonthN = monthSheet.getRange(monthSheet.getLastRow(),1).getValue()
var now = new Date
var monthN = Utilities.formatDate(now,"GMT","MM")
Logger.log(lastMonthN)
var month= monthSheet.getRange(monthSheet.getLastRow(),2).getValue()
Logger.log(month+" Month || MonthN "+monthN)
if(Number(monthN)!=Number(lastMonthN)){
monthSheet.getRange(monthSheet.getLastRow()+1,1).setValue(Number(lastMonthN)+1)
Logger.log("Added Month "+Number(monthN))
}
month = monthSheet.getRange(monthSheet.getLastRow(),2).getValue()
Logger.log(month)
var finder = profitSheet.getRange('B:B').createTextFinder(month).findNext()
if(finder==null){Logger.log("month not in PKs sheet:"+month)}
else{
var row = finder.getRow()
var p = profitSheet.getRange(row,5).getValue()
Logger.log("profit for month:"+month+" is:"+p)
monthSheet.getRange(monthSheet.getLastRow(),3).setValue(tot)
monthSheet.getRange(monthSheet.getLastRow(),4).setValue(p)
// overflow fund
var remainingFunds = expensesS.getRange('K3').getValue()
monthSheet.getRange(monthSheet.getLastRow(),14).setValue(remainingFunds)
var oldFundTot = monthSheet.getRange(monthSheet.getLastRow()-1,14).getValue()
var dif = Number(remainingFunds)-Number(oldFundTot)
if(monthSheet.getLastRow()<4){dif=remainingFunds}
Logger.log(remainingFunds)
Logger.log(oldFundTot)
Logger.log(dif)
monthSheet.getRange(monthSheet.getLastRow(),13).setValue(dif)
//expenses 
dataS.getRange('A1').setValue(monthN)
var sum = dataS.getRange('D2').getValue()
monthSheet.getRange(monthSheet.getLastRow(),12).setValue(sum)
// investors payout ammounts
var totPayout = invSheet.getRange('H1').getValue()
var totReinv = invSheet.getRange('J1').getValue()
monthSheet.getRange(monthSheet.getLastRow(),6).setValue(totPayout)
monthSheet.getRange(monthSheet.getLastRow(),7).setValue(totReinv)
// splitting of surplus
var surplus = monthSheet.getRange(monthSheet.getLastRow(),8).getValue()
monthSheet.getRange(monthSheet.getLastRow(),9).setValue(Number(surplus)*0.5)
monthSheet.getRange(monthSheet.getLastRow(),10).setValue(Number(surplus)*0.25)
monthSheet.getRange(monthSheet.getLastRow(),11).setValue(Number(surplus)*0.25)
}






}

function addToReserve(){
  var value = monthSheet.getRange(monthSheet.getLastRow()-1,10).getValue()
  var lastrow = expensesS.getRange("K1").getValue()+1
  Logger.log(value+"||"+lastrow)
  expensesS.getRange(lastrow,10,1,2).setValues([[value,"Value Added From Surplus Profits"]])
  }
