
const {ipcRenderer} = require('electron');

angular.module('app', [
  'ngMaterial',
  'ui.router',
  'md.data.table'
])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('orange');
  })

  .controller('MainCtrl', function ($scope, $mdDialog) {

    $scope.users = [
      {id: 10001, name: 'Satit Rinapit'},
      {id: 10002, name: 'John Done'}
    ];

    $scope.showAlert = function (event) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('ยืนยันการลบ')
          .textContent('คุณต้องการลบรายการนี้ ใช่หรือไม่?')
          .ariaLabel('alert')
          .ok('ตกลง')
          .targetEvent(event)
      );
    }

    $scope.showConfirm = function (event) {
      var confirm = $mdDialog.confirm()
        .title('ยืนยันข้อมูล')
        .textContent('คุณต้องการบันทึกรายการนี้ ใช่หรือไม่?')
        .ariaLabel('confirm')
        .targetEvent(event)
        .ok('ใช่, ฉันต้องการบันทึก')
        .cancel('ยกเลิก');
      
      $mdDialog.show(confirm).then(function () {
        console.log('บันทึกรายการ')
      }, function () {
        console.log('ยกเลิกการบันทึก')
      });
      
    }


    $scope.showAddMember = function () { 

      $mdDialog.show({
        controller: 'DialogCtrl',
        templateUrl: './templates/add-dialog.html',
        parent: angular.element(document.body),
        // targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: false
      })
        .then(function (members) {
          alert(JSON.stringify(members));
          console.log(members);
        }, function () {
          //
        });

    }

  })
  .controller('DialogCtrl', function ($scope, $mdDialog) {
    $scope.name = 'AngularJs';

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };
    
    $scope.save = function () {
      var members = {
        name: 'Satit',
        username: 'monalisa',
        password: '123456'
      };

      $mdDialog.hide(members);
    }
  })
  .controller('ToolbarCtrl', function ($scope) {
    $scope.openMenu = function ($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.minimize = function () {
      ipcRenderer.sendSync('minimize-window')
    }

    $scope.maximize = function () {
      ipcRenderer.sendSync('maximize-window')
    }

    $scope.quit = function () {
      ipcRenderer.sendSync('quit-app')
    }
  })
