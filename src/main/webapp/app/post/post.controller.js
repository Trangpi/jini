(function() {
    'use strict';

    angular
        .module('jiniApp')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', 'Principal', 'LoginService', '$state','$http'];

    function PostController ($scope, Principal, LoginService, $state,$http) {
        var vm = this;

        vm.account = null;
        vm.entry=null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.btnPostClick = btnPostClick;
        vm.postdata=postdata;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
        function btnPostClick() {
            var title = document.getElementById('titleContent').value;
            var content = document.getElementById('textContent').value;
            $.post('/api/entries', {
                content: content,
                title: title
            }, function(data){
                console.log(data);
            });
            $.get('/api/entries', function(data){
                console.log(data);
            });
        }
        function postdata(){

        }
    }
})();
