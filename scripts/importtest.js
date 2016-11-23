//process.env.NODE_ENV = 'development';
var fs = require('fs');
var sqldb = require('./server/sqldb');
var Ingredient = sqldb.Ingredient;
var Unit = sqldb.Unit;
var Recipe = sqldb.Recipe;
var RecipeIngredients = sqldb.RecipeIngredients;


var unitMap ={};


Unit.findAll().then((unitArray) =>{
            //console.log(unitArray);
    
            unitMap = unitArray.reduce((o,v) => {
                var uniquekey = v.name+v.shortName+v.longName;
                o[uniquekey] = v.get();
                return o;
            });
            console.log(unitMap);
            /* var unitMap = Object.keys(uni).reduce(function(o, cur){
                o[cur] = data[idMap[cur]];
                return o;
            },{});*/
        });
console.log(unitMap);

function readLines(input, func, model, idMap) {
    var remaining = '';
    var lineNum = 0;
    var columnNames = [];
    
  function mapArray(o,v,i){
              o[columnNames[i]] = v;
              return o;
  }
    
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    var lineAry = [];
    //var lineObj = {}; //Map of columnnames to Line array
    
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      line = line.replace('\r', '');
      lineAry= line.split(',');
      lineNum++;
      console.log('Line: '+line);
      if (lineNum==1){
          columnNames = lineAry;
      } else {
          var lineObj = lineAry.reduce(mapArray,{});
          func(lineObj, model, idMap);
      }
      
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining, model, idMap);
    }
  });
}

function process(data, model, idMap) {
    var result;
    var outresult;
    //console.log(data);
    var updateData = Object.keys(idMap).reduce(function(o, cur){
        o[cur] = data[idMap[cur]];
        return o;
    },{});
    
    result = model.upsert(updateData).then(update =>{
    console.log(updateData);
    outresult = update ? "CREATE" : "UPDATE";
    console.log(outresult);
    //console.log(data);
    });

}

function importData(model,idMap,fileName) {
     var input = fs.createReadStream(fileName);
        readLines(input, process, model, idMap);
/*    model.sync().then(() => {
        var input = fs.createReadStream(fileName);
        readLines(input, process, model, idMap);
    });*/
}


function processRecipeIngredientUnit(input, func, unitArray) {
    //console.log('processRecipeIngredientUnit');
    var remaining = '';
    var lineNum = 0;
    var columnNames = [];
    
    
  function mapArray(o,v,i){
              o[columnNames[i]] = v;
              return o;
  }
    
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    var lineAry = [];
    //var lineObj = {}; //Map of columnnames to Line array
    
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      line = line.replace('\r', '');
      lineAry= line.split(',');
      lineNum++;
      console.log('Line: '+line);
      if (lineNum==1){
          columnNames = lineAry;
      } else {
          var lineObj = lineAry.reduce(mapArray,{});
          func(lineObj, unitArray);
      }
      
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining, unitArray);
    }
    console.log('Done processing');
    console.log(unitArray);
    Object.keys(unitArray).forEach(function(key){
        Unit.create(unitArray[key], {logging : console.log});
    });
      
  });
}


function importRecipeIngredients() {
        var unitPromises =[];
        //var unitMap = {};
        var recipeIngredientMap ={};

        Unit.findAll().then((unitArray) =>{
            console.log(unitArray);
/*            var unitMap = Object.keys(uni).reduce(function(o, cur){
                o[cur] = data[idMap[cur]];
                return o;
            },{});*/
        });
/*        var input = fs.createReadStream( './server/data/ingredient_unique.csv');
        readLines(input, processUnit);
        unitPromises.all(()=>{
            RecipeIngredients.upsert(updateData, {logging:console.log}).then(update =>{
                console.log(updateData);
                outresult = update ? "CREATE" : "UPDATE";
                console.log(outresult);
                //console.log(data);
            });
        });*/
}
function processUnit(data, unitMap, unitPromises) {
    console.log('Process data: ');
    console.log(data);
    var outresult;
    //console.log(data);
    var unitData = {
        name: data.UNIT,
        shortName: data.UNIT_SHORT,
        longName: data.UNIT_LONG,
    };
    var updateData ={};
    //var unitid;

    Unit.findOrCreate({where: unitData, logging : console.log}).spread(function(unit) {
        console.log('Unit ID:');    
        console.log(unit.get('_id'));
        updateData = {
                originalString:data['ORIGINAL+STRING'],
                amount:data.AMOUNT,
                RecipeId:data.RECIPE_ID,
                IngredientId:data.INGREDIENT_ID,
                UnitId: unit.get('_id')
            };
    }).then(function(){
        
    });

}

/*sqldb.sequelize.sync()
.then(() =>{
    //Import recipes
importData(Recipe,{
            _id: 'RECIPE_ID',
    recipeName: 'TITLE',
    readyInMinutes: 'READY_IN_MINUTES',
    servings: 'SERVINGS',
    imageAddress: 'IMAGE',
    sourceURL: 'SOURCE_URL',
    sourceName: 'SOURCE_NAME',
    veryPopular: 'VERY_POPULAR'
    },
   './server/data/recipe_unique.csv');

}).then(()=>{
        //Import Recipe Cuisines
importData(RecipeCuisine,{
    RecipeId: 'RECIPE_ID',
    cuisineName: 'CUISINE_TYPE'
    },
   './server/data/cuisineRecipe_unique.csv');
}).then(()=>{
//Import ingredients
importData(Ingredient,{
    _id:'INGREDIENT_ID',
    aisle:'AISLE',
    ingredientName:'NAME',
    image:'IMAGE'
    },
   './server/data/ingredient_unique.csv');
    //Import ingredients+recipes+units
});.then(()=>{
importUnits(); 
}).then(()=>{

importRecipeIngredients();});

//importRecipeIngredients();*/
//importUnits();

//importRecipeIngredients();
