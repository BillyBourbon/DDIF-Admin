
function snap_shot(){
  var target = sss.getSheetByName("SnapShot")
  target.getRange(3,2,target.getLastRow(),target.getLastColumn()).clearContent()
  SpreadsheetApp.flush()
  if(target.getRange(2,7).getValue()==""){
    target.deleteColumns(7,1)
    }
  var fixed = sss.getSheetByName("Fixed Payout")
  var variable = sss.getSheetByName("Variable Payout")
  var values = fixed.getRange(5,2,fixed.getLastRow()-3,6).getValues()
  target.getRange(target.getLastRow()+1,2,values.length,6).setValues(values)
  SpreadsheetApp.flush()
  values = variable.getRange(5,2,variable.getLastRow()-3,6).getValues()
  target.getRange(target.getLastRow()+1,2,values.length,6).setValues(values)
  SpreadsheetApp.flush()
  target.insertColumns(7,1)
  target.setColumnWidth(7,50)
  target.getRange(3,7,target.getLastRow()-2).insertCheckboxes()
  Utilities.sleep(100)
  backup()
  }

function backup(){
  const x = "XXXXXXXX"
  const spread = SpreadsheetApp.openByUrl(x)
  try{
    var sheet = sss.getSheetByName("SnapShot")
    sheet.copyTo(spread)
    var time = Utilities.formatDate(new Date(),"GMT","dd/MM/YY - HH:mm")
    spread.getSheetByName("Copy of SnapShot").setName(time);
    }
  catch(e){
    log(e)
    }
  }

function reinvestments(){
  Logger.log('AutoReinvest')
  var histSheet = sss.getSheetByName("reinvestment history")
  var invSheet = sss.getSheetByName("Investors")
  var nameList = invSheet.getRange('B3:B').getValues()
  var oldAmmountList = invSheet.getRange('C3:C').getValues()
  var ammountToReinvestList = invSheet.getRange('G3:G').getValues()
  var time = new Date
  var now = Utilities.formatDate(time,"GMT","HH:mm - dd/MM/YY")
  for(i in nameList){
    var name = nameList[i]
    if(name!=""){
      var old = oldAmmountList[i]
      var per = ammountToReinvestList[i]
      var ammount = Number(old)+Number(per)
      //Logger.log('Name: '+name+'\nOld: '+old+'\nNew: '+ammount)
      if(Number(per)>0){
      var lastRow = histSheet.getLastRow()
      histSheet.getRange(lastRow+1,1,1,4).setValues([[name,old,Number(ammount),now]])
      
      
      var finder = invSheet.getRange('B:B').createTextFinder(name).findNext()
      var row = finder.getRowIndex()
      var n = Number(ammount)
      invSheet.getRange(row,3).setValue(Math.round(n))
      Logger.log(name+" Added to history with Ammount Reinvested of "+ammount)
      }
    }
  }
}
