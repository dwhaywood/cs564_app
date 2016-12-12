//process.env['NODE_ENV'] = 'development';
var fs = require('fs');
var sqldb = require('../server/sqldb');
var Ingredient = sqldb.Ingredient;
var Unit = sqldb.Unit;
var Recipe = sqldb.Recipe;
var RecipeDiet = sqldb.RecipeDiet;
var ScheduledMeal = sqldb.ScheduledMeal;
var RecipeCuisine = sqldb.RecipeCuisine;
var RecipeIngredients = sqldb.RecipeIngredients;
var NutritionAttributes = sqldb.NutritionAttributes;
var Friends = sqldb.Friends;
var User = sqldb.User;


var error_log = fs.createWriteStream('importerrors.txt');
//Read lines from file
function readLines(input, func, model, idMap) {
    var remaining = '';
    var lineNum = 0;
    var columnNames = [];
    var outarray = [];
    
  function mapArray(o,v,i){
              o[columnNames[i]] = v;
              return o;
  }
    
  input.on('data', function(data) {
      console.log('Data loaded');
    remaining += data;
      console.log("Chunk:"+data);
    var index = remaining.indexOf('\n');
      console.log(index);
    var last  = 0;
    var lineAry = [];
    //var working = true;
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
      console.log('End of file');
    if (remaining.length > 0) {
      func(remaining, model, idMap);
    }
/*  
    input.on('close', function() {
        working = false;
        
    });  
    */
  });
}

function process(data, model, idMap) {
    //var result;
    var outresult;
    //console.log(data);
    var updateData = Object.keys(idMap).reduce(function(o, cur){
        
        if (data[idMap[cur]]){
            o[cur] = data[idMap[cur]];
        }

        return o;
    },{});
    
    if (updateData._id || updateData.name || updateData.IngredientId || updateData.RecipeId ){ //Make sure it has a primary key
        model.upsert(updateData).then(update =>{
            console.log(updateData);
            outresult = update ? "CREATE" : "UPDATE";
            console.log(outresult);
        //console.log(data);
        }).catch(function (e){
            error_log.write(e);
                 });
    }


}

function importData(model,idMap,fileName) {
    console.log('Importing data for '+model);
     var input = fs.createReadStream(fileName);
        readLines(input, process, model, idMap);
/*    model.sync().then(() => {
        var input = fs.createReadStream(fileName);
        readLines(input, process, model, idMap);
    });*/
}


//Recipe Ingredient Unit Functions
function importUnits() {
    
        var input = fs.createReadStream( './server/data/ingredient_unique.csv');
        var unitArray = {};
        processRecipeIngredientUnit(input, processRecipeIngredientLineUnit, unitArray);


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
      console.log(data);
      remaining.replace('\r','\n');
    var index = remaining.indexOf('\n');
      console.log(index);
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

function processRecipeIngredientLineUnit(data, unitArray) {
    console.log('processRecipeIngredientLineUnit');
    console.log('Process data: ');
    console.log(data);
    //console.log(data);
    var unitData = {
        name: data.UNIT,
        shortName: data.UNIT_SHORT,
        longName: data.UNIT_LONG,
    };
    
    var unique = Object.keys(unitData).reduce(function(out,val){
        out = out+unitData[val]; 
        return out;
    },'');
    
    unitArray[unique] = unitData;
    
    
    //var updateData ={};
    //var unitid;
    

}

function importRecipeIngredients() {
        var input = fs.createReadStream( './server/data/ingredient_unique.csv');
        readLines(input, processSpecial);
}

function processSpecial(data, unitMap) {
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
        RecipeIngredients.upsert(updateData, {logging:console.log}).then(update =>{
                console.log(updateData);
                outresult = update ? "CREATE" : "UPDATE";
                console.log(outresult);
                //console.log(data);
            });
    });

}

function findOrCreateUnit(unitData){
    return Unit.findOrCreate({where: unitData});
}
export function RunAllWithSync() {
    sqldb.sequelize.sync({force:true})
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
    }).then(()=>{
        importData(Unit,{
            name:'UNIT',
            shortName:'UNIT_SHORT',
            longName:'UNIT_LONG',
            },
           './server/data/ingredient_unique.csv'); 
    }).then(()=>{
        importData(RecipeIngredients,{
            IngredientId:'INGREDIENT_ID',
            RecipeId:'RECIPE_ID',
            UnitName:'UNIT',
            amount:'AMOUNT',
            originalString:'ORIGINAL+STRING'
            },
           './server/data/ingredient_unique.csv'); 
    });

}

export function loadRecipeIngredients() {
    console.log('Loading Recipe Ingredients');
 /*   RecipeIngredients.sync({force: true}).then(()=>{
        console.log('Loading new data');
        importData(RecipeIngredients,{
            IngredientId:'INGREDIENT_ID',
            RecipeId:'RECIPE_ID',
            UnitName:'UNIT',
            amount:'AMOUNT',
            originalString:'ORIGINAL+STRING'
            },
           './server/data/recipeIngredients_entire.csv'); 
    }).catch(console.error);*/

   importData(RecipeIngredients,{
    IngredientId:'INGREDIENT_ID',
    RecipeId:'RECIPE_ID',
    UnitName:'UNIT',
    amount:'AMOUNT',
    originalString:'ORIGINAL+STRING'
    },
   './server/data/recipeIngredients_entire.csv'); 
}

function importMissingIngredients() {
    importData(Ingredient,{
            _id:'INGREDIENT_ID',
            aisle:'AISLE',
            ingredientName:'NAME',
            image:'IMAGE'
            },
           './server/data/ingredient_unique.csv');
}

function importNutritionAttributes() {
    console.log('Sync Nutrition Attributes');
    NutritionAttributes.sync({force: true}).then(()=> {
        console.log('Importing nutrition attributes');
        importData(NutritionAttributes,{
            attribute: 'ATTRIBUTE',
            amount: 'AMOUNT',
            unit: 'UNIT',
            perecentDailyValue: 'PERCENT_DAILY_VALUE',
            RecipeId: 'RECIPEID'
            },
           './server/data/nutrient_unique.csv');
    });
    
}

importNutritionAttributes();

//loadRecipeIngredients();

//ScheduledMeal.sync({force: true}).then(()=>{
//    console.log('ScheduledMeals Synced');
//});

/*User.findAll().then((res)=>{
    console.log(res);
});*/

/*Friends.sync({force: true}).then(()=>{
    console.log('Friends synced.');
    User.sync().then(()=>{
        console.log('User synced.');
        Friends.upsert({UserId: 539, FriendId: 1});
        User.find({where: { _id: 539}, include: [{association: Friends}]}).then((res)=>{
            console.log(res);
        });
    });
});*/

//importMissingIngredients();

//importRecipeIngredients();
//importUnits();

//importRecipeIngredients();
