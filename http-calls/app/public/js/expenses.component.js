(function () {
  'use strict'

  angular.module('app')
    .component('expenses', {
      controller: controller,
      template: `

      <h1>Expenses</h1>

      <form ng-model="addForm" ng-submit="$ctrl.addExpense($ctrl.addForm)">
        <p>
          Category: <input ng-model="$ctrl.addForm.category" name='category' id="new-category">
        </p>
        <p>
          Amount: <input ng-model="$ctrl.addForm.amount" name='amount' id="new-amount">
        </p>
        <p>
          <button type="submit">Add Expense</button>
        </p>
      </form>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="item in $ctrl.expenses">
            <td>{{item.id}}</td>
            <td>{{item.category}}</td>
            <td>{{item.amount}}</td>
            <td>
              <a href="#" ng-click="formOpen = !formOpen" >edit</a>
              <div ng-show="formOpen">

              <form ng-model="editForm" ng-submit="$ctrl.editExpense($ctrl.editForm, item.id)">
               <input type='hidden' ng-model="$ctrl.editForm.id" name='id' ng-value="$ctrl.editForm.id">
                <p>
                  Category: <input ng-model="$ctrl.editForm.category" name='category' id="edit-category" placeholder="{{item.category}}">
                </p>
                <p>
                  Amount: <input ng-model="$ctrl.editForm.amount" name='amount' id="edit-amount" placeholder="{{item.amount}}">
                </p>
                <p>
                  <button ng-click="formOpen = !formOpen" type="submit">Update Expense</button>
                </p>
              </form>

              </div>
              <a href="#" ng-click="$ctrl.deleteExpense($event, item)">delete</a>
            </td>
          </tr>
        </tbody>
      </table>`
    })

  controller.$inject = ['$http']
  function controller ($http) {
    const vm = this

    vm.$onInit = function () {
      $http.get('/api/expenses').then(function (response) {
        vm.expenses = response.data
      })
    }

    vm.addExpense = function (data) {
      $http.post('/api/expenses', data).then(res => {
        vm.expenses.push(res.data)
      })
    }

    vm.editExpense = function (data, id) {
      data['id'] = id
      $http.patch('/api/expenses/:id', data).then(res => {
        vm.expenses.splice(vm.expenses.indexOf(data), 1)
        vm.expenses.push(res.data)
      })
    }

    vm.deleteExpense = function (e, item) {
      e.preventDefault()
      $http.delete('/api/expenses/' + item['id']).then(res => {
        vm.expenses.splice(vm.expenses.indexOf(item), 1)
      })
    }
  }
}())
