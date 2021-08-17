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
    //add_investor()
    Logger.log("Added New Investor")
    s.getRange("C7").setValue(false)
    }
  
}
