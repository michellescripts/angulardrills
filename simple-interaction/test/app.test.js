describe('App', function () {
  beforeEach(() => browser.get(`/`))

  it('formats the nickname correctly', function () {
    new AppTest().expectFormatWithNickname()
  })

  it('formats the name correctly without a nickname', function () {
    new AppTest().expectFormatWithoutNickname()
  })

  class AppTest {

    constructor () {
      this.firstNameField = element(by.model('$ctrl.firstname'))
      this.nicknameField = element(by.model('$ctrl.nickname'))
      this.lastNameField = element(by.model('$ctrl.lastname'))
      this.submitButton = element(by.buttonText('Submit'))
      this.lastItem = element(by.css('p:last-child'))
    }

    expectFormatWithNickname () {
      // this.firstNameField.sendKeys('Dwayne')
      this.nicknameField.sendKeys('the Rock')
      this.lastNameField.sendKeys('Johnson')
      this.submitButton.click()

      expect(this.lastItem.getText()).toEqual('Dwayne "the Rock" Johnson')
    }

    expectFormatWithoutNickname () {
      // this.firstNameField.sendKeys('Dwayne')
      this.lastNameField.sendKeys('Johnson')
      this.submitButton.click()

      expect(this.lastItem.getText()).toEqual('Dwayne Johnson')
    }

  }
})
