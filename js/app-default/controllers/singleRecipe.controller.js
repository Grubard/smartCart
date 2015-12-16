let SingleRecipe = function($http, SERVER, $cookies, $stateParams) {
  let id = $stateParams.id;
  let vm = this;
  let url = SERVER.URL;
  let token = $cookies.get('auth_token');
  SERVER.CONFIG.headers['Access-Token'] = token;

  // function Item (foodItem) {
  // this.title = foodItem.title;
  // this.quantity = foodItem.quantity;
  // this.category = foodItem.category;
  // this.preferred = foodItem.preferred;
  // this.necessity = foodItem.necessity;
  // this.units= foodItem.units;
  // }
  let toBuy= [];
  $http.get(url+'/recipe/'+ id, SERVER.CONFIG).then((res)=>{
    console.log('hi', res);
    vm.title = res.data.name;
    vm.image = res.data.source_image_url;
    vm.recipeSource = res.data.source_url;
    vm.id= res.data.id;
    vm.ingredients= res.data.ingredients;

    vm.ingredients.forEach(function(x){
      console.log(x);
      
      let food = {
        title: x.name,
        quantity: x.amount,
        units: x.unit,
        category: 'other',
        preferred: false,
        absolute: x.amount
      };
      toBuy.push(food);
      
    });
  });

  let pantry = [];
  let grocery = [];
  let fullPantry = [];

  $http.get(url+ '/edible', SERVER.CONFIG).then((res)=>{

    res.data.forEach(function(x){
        pantry.push(x.title);
        fullPantry.push(x);
      });
  });

  $http.get(url+ '/grocery', SERVER.CONFIG).then((res)=>{
    res.data.forEach(function(y){
        grocery.push(y.title);
      });
  });

  vm.addThisRecipe= function(){
    console.log(grocery);
    console.log(pantry);
    
    toBuy.forEach(function(x){
      let yay = $.inArray(x.title, pantry);
      console.log('this is yay: ', yay);
      let otherYay = $.inArray(x.title, grocery); 
      let tacos = fullPantry[yay];
      console.log('these are tacos: ', tacos);
      

      if(yay === -1 && otherYay === -1){
        $http.post(url+'/grocery', x, SERVER.CONFIG).then((res)=>{
          console.log('what we posted: ', res);
        
        });
        
      } else if (yay !== -1) {
        console.log(toBuy);

      }
    });  
      
    
      
  };

      
    

};

SingleRecipe.$inject = ['$http', 'SERVER', '$cookies', '$stateParams'];

export default SingleRecipe;