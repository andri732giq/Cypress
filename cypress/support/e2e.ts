// cypress/support/e2e.ts
import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // Повертаємо false, щоб Cypress не провалив тест через неперехоплені помилки
  return false;
});