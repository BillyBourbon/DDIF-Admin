const url = "https://docs.google.com/spreadsheets/d/1HQBCSnHxx8IRAEwoYlz_c3FsDFB2pdH4yqB7KWop-18/edit?usp=drivesdk"
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
  Logger.log("New Investor\nName: "+name+", Scheme: "+scheme+", Ammount: "+ammount+", notes: "+notes)
  sheet = sss.getSheetByName("Investors")
  sheet.getRange(sheet.getLastRow()+1,2,1,4).setValues([[name,ammount,scheme,notes]])
  SpreadsheetApp.flush()
  }
