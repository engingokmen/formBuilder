// "angular-route"   "ngRoute"

var app = angular.module("formApp", ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
  $locationProvider.html5Mode (true);
  $routeProvider
  .when("/", {
    templateUrl : "main.html",
    controller:"mainCtrl"
  })
  // •	Form sayfasının routingi /forms/{formName} şeklinde olmalıdır.
  .when("/forms/:formId", {
    templateUrl : "formRender.html",
    controller:"formCtrl"
  })
});

app.controller("mainCtrl", function($scope) {
  $scope.values =[];
  for(var i =0; i < localStorage.length; i++){
    const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $scope.values.push(obj);
  }

// •	Form nesnesine ait json bilgisi aşağıda paylaşılmıştır. Bu json modeline uyulması gerekmektedir.
  $scope.dataTypes = ["STRING","NUMBER"]
  $scope.forms = {"name": "Test form",
                    "description": "Uye bilgi formu",
                    createdAt: "2017-01-08",
                    fields: [ { "required": true,
                                "name": "Ad",
                                dataType: "STRING" },
                              { "required": true,
                                "name": "Soyad",
                                dataType: "STRING" },
                              { "required": false,
                                "name": "Yaş",
                                dataType: "NUMBER" } ] };

  $scope.createDate = function() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    today = yyyy+'-'+mm+'-'+dd;
    $scope.forms.createdAt=today.toString();
  }

  $scope.save = function() {
    localStorage.setItem($scope.forms.name,JSON.stringify($scope.forms));
    $scope.recordAlert=true;
    const objget=JSON.parse(localStorage.getItem($scope.forms.name));
    $scope.values.push(objget);
  };

  $scope.close = function() {
    $scope.recordAlert=false;
  };

});

app.controller('formCtrl', function($scope,$routeParams) {
  let fn = "";
  fn = $routeParams.formId;
  $scope.formName = fn;
  const localStorageForm = JSON.parse(localStorage.getItem(fn));

  $scope.selectedForm = localStorageForm;

  $scope.firstName = localStorageForm.fields[0].name;
  $scope.lastName = localStorageForm.fields[1].name;
  $scope.agee = localStorageForm.fields[2].name;

});
