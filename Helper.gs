const url = "XXXXXX"
const sss = SpreadsheetApp.openByUrl(url)

function remove_triggers(){
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
    Logger.log("Removed Trigger: "+triggers[i])
    }
}
function add_investor(){
  var sheet = sss.getSheetByName("Entry Forms")
  var values = sheet.getRange("C3:C6").getValues()
  var name = values[0][0]
  var scheme = values[1][0]
  var ammount = values[2][0]
  var notes = values[3][0]
  log("New Investor\nName: "+name+", Scheme: "+scheme+", Ammount: "+ammount+", notes: "+notes)
  sheet = sss.getSheetByName("Investors")
  sheet.getRange(sheet.getLastRow()+1,2,1,4).setValues([[name,ammount,scheme,notes]])
  SpreadsheetApp.flush()
  }
function remove_investor(){
  var sheet = sss.getSheetByName("Entry Forms")
  var values = sheet.getRange("C11:C14").getValues()
  var name = values[0][0]
  var scheme = values[2][0]
  var ammount = values[1][0]
  var notes = values[3][0]
  log("Investor Removal\nName: "+name+", Scheme: "+scheme+", Ammount: "+ammount+", notes: "+notes)
  sheet = sss.getSheetByName("Investors")
  var row = sheet.getRange("B:B").createTextFinder(name).matchEntireCell(true).findNext()
  try{
    row = row.getRow()
    sheet.deleteRow(row)
    SpreadsheetApp.flush()
    }
  catch(e){
    Logger.log(e)
    if(row!=null){
      log(e)
      }
    }
  }
function edit_investor(){
  var sheet = sss.getSheetByName("Entry Forms")
  var values = sheet.getRange("C19:C24").getValues()
  var name = values[0][0]
  var scheme = values[2][0]
  var ammount = values[1][0]
  var notes = values[3][0]
  
  var newAmmount = values[4][0]
  var newScheme = values[5][0]
  log("Editing Investor\nName: "+name+", Old Scheme: "+scheme+", Old Ammount: "+ammount+", notes: "+notes+", New Scheme: "+newScheme+", New Ammount: "+newAmmount)
  if(newAmmount !=""){ammount = newAmmount}
  if(newScheme !=""){scheme = newScheme}
  sheet = sss.getSheetByName("Investors")
  var row = sheet.getRange("B:B").createTextFinder(name).matchEntireCell(true).findNext()
  try{
    row = row.getRow()
    sheet.getRange(row,2,1,4).setValues([[name,ammount,scheme,notes]])
    SpreadsheetApp.flush()
    }
  catch(e){
    Logger.log(e)
    if(row!=null){
      log(e)
      }
    }
  }
function log(msg){
  var time = Utilities.formatDate(new Date(),"GMT","dd/MM/YY - HH:mm:ss")
  var sheet = sss.getSheetByName("Script Logs")
  sheet.getRange(sheet.getLastRow()+1,1,1,2).setValues([[time,msg]])
  Logger.log("msg: "+msg)
}
