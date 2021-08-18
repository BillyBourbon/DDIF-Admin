function createTrigger(){
ScriptApp.newTrigger('button')
    // insert the file ID for the spreadsheet you'd like to edit
   .forSpreadsheet('1HQBCSnHxx8IRAEwoYlz_c3FsDFB2pdH4yqB7KWop-18')
   .onEdit()
   .create();
Logger.log("Added Trigger For Button")
}

function button(e){
  var sheet =e.source.getActiveSheet().getName()
  var range = e.range.getA1Notation()
  var s = sss.getSheetByName("Entry Forms")
  Logger.log("Range: "+range)
  Logger.log("Sheet: "+sheet)
  if(sheet == "Entry Forms" && range == "C7"){
    add_investor()
    Logger.log("Added New Investor")
    s.getRange("C7").setValue(false)
    s.getRange("C3:C6").clearContent()
    }
  if(sheet == "Entry Forms" && range == "C15"){
    remove_investor()
    Logger.log("Removed Investor")
    s.getRange("C15").setValue(false)
    s.getRange("C11").clearContent()
    }
  if(sheet == "Entry Forms" && range == "C25"){
    edit_investor()
    Logger.log("Edited Investor")
    s.getRange("C25").setValue(false)
    s.getRange("C19").clearContent()
    s.getRange("C23:C24").clearContent()
    }
  
}
