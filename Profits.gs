function profits(){
  var inv = sss.getSheetByName("Investors")
  var profit = sss.getSheetByName("Profit")
  
  var sSheet = SpreadsheetApp.openById("1oDNMEvBDjPaqsS0tGjK7SUdXFekQ2hdpEV9z_Xhzqqw").getSheetByName("months")
  
  var monthN = profit.getRange(profit.getLastRow(),1).getValue()
  var month = profit.getRange(profit.getLastRow(),2).getValue()
  var m = Utilities.formatDate(new Date(),"GMT","MM")
  monthN = Number(monthN)
  m=Number(m)
  Logger.log([month,monthN,m])
  if(monthN == m){
    var row = sSheet.getRange("B:B").createTextFinder(month).matchEntireCell(true).findNext()
    try{
      row = row.getRow()
      var p = sSheet.getRange(row,5).getValue()
      profit.getRange(profit.getLastRow(),4).setValue(p)
      var pay = inv.getRange("F1:G1").getValues()
      profit.getRange(profit.getLastRow(),6,1,2).setValues(pay)
      Logger.log(p)
      Logger.log(pay)
      SpreadsheetApp.flush()
      var ex = profit.getRange(profit.getLastRow(),8).getValue()
      Logger.log("Excess Profit: "+ex)
      profit.getRange(profit.getLastRow(),9,1,3).setValues([[ex*0.5,ex*0.25,ex*0.25]])
      
      Logger.log("Updated Months Stats")
    }
    catch(e){
      Logger.log(e)
      }
    }
  if(monthN < m){
    try{
      profit.getRange(profit.getLastRow()+1,1).setValue(m)
      var tot = inv.getRange("C1").getValue()
      profit.getRange(profit.getLastRow(),3).setValue(tot)
      var p = sSheet.getRange(row,5).getValue()
      profit.getRange(profit.getLastRow(),4).setValue(p)
      var pay = inv.getRange("F1:G1").getValues()
      profit.getRange(profit.getLastRow(),6,1,2).setValues(pay)
      log("new month added: "+m+" Total at start: "+tot)
      Logger.log("Added New Month")
    }
    catch(e){
      log(e)
      }
    }
  
  }
