/// <reference types="cypress" />

describe('Тести додатка Contacts', () => {
  beforeEach(() => {
    // Відвідуємо додаток перед кожним тестом
    cy.visit('http://localhost:5173'); // Типовий порт сервера розробки Vite
  });

  it('повинен додавати новий контакт', () => {
    // Дані для нового контакту
    const newContact = {
      name: 'Іван Іванов',
      phone: '123-456-7890',
    };

    // Знаходимо поля введення та додаємо контакт
    cy.get('.name-input').type(newContact.name);
    cy.get('.phone-input').type(newContact.phone);
    cy.get('button').contains('Додати').click();

    // Перевіряємо, чи контакт доданий до списку
    cy.get('.contacts-list li')
      .should('contain', newContact.name)
      .and('contain', newContact.phone);
  });

  it('повинен редагувати існуючий контакт', () => {
    // Додаємо контакт для редагування
    cy.get('.name-input').type('Іван Іванов');
    cy.get('.phone-input').type('123-456-7890');
    cy.get('button').contains('Додати').click();

    // Дані для редагованого контакту
    const editedContact = {
      name: 'Марія Іванова',
      phone: '987-654-3210',
    };

    // Клікаємо на кнопку редагування для першого контакту
    cy.get('.contacts-list li:first-child button').contains('Редагувати').click();

    // Оновлюємо поля
    cy.get('.name-input').clear().type(editedContact.name);
    cy.get('.phone-input').clear().type(editedContact.phone);
    cy.get('button').contains('Зберегти').click();

    // Перевіряємо, чи контакт оновлено
    cy.get('.contacts-list li:first-child')
      .should('contain', editedContact.name)
      .and('contain', editedContact.phone);
  });

  it('повинен видаляти контакт', () => {
    // Додаємо контакт для видалення
    cy.get('.name-input').type('Іван Іванов');
    cy.get('.phone-input').type('123-456-7890');
    cy.get('button').contains('Додати').click();

    // Зберігаємо ім'я контакту для перевірки
    cy.get('.contacts-list li:first-child').then(($contact) => {
      const contactName = $contact.text();
      // Клікаємо на кнопку видалення
      cy.get('.contacts-list li:first-child button')
        .contains('Видалити')
        .click();

      // Перевіряємо, чи контакт видалено
      cy.get('.contacts-list').should('not.contain', contactName);
    });
  });

  it('повинен сортувати контакти за ім’ям', () => {
    // Додаємо кілька контактів для тестування сортування
    cy.get('.name-input').type('Чарлі Браун');
    cy.get('.phone-input').type('555-123-4567');
    cy.get('button').contains('Додати').click();

    cy.get('.name-input').clear().type('Аліса Сміт');
    cy.get('.phone-input').clear().type('555-987-6543');
    cy.get('button').contains('Додати').click();

    cy.get('.name-input').clear().type('Боб Джонс');
    cy.get('.phone-input').clear().type('555-555-5555');
    cy.get('button').contains('Додати').click();

    // Клікаємо на кнопку сортування
    cy.get('button').contains('Сортувати').click();

    // Перевіряємо, чи контакти відсортовані в алфавітному порядку
    cy.get('.contacts-list li')
      .then(($list) => {
        const names = Cypress._.map($list, (el) => {
          // Витягуємо ім'я з тексту елемента (перший елемент до телефону)
          return el.innerText.split('\n')[0].trim();
        });
        expect(names).to.deep.equal([...names].sort());
      });
  });
});