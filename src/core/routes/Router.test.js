// import {Router} from './Router'
// import {Page} from '../page/Page'

// class DashboardPage extends Page {
//   getRoot() {
//     const root = document.createElement('div')
//     root.innerHTML = 'dashboard'
//     return root
//   }
// }
// class ExcelPage extends Page {}

// describe('Router:', () => {
//   let router
//   let $root

//   beforeEach(() => {
//     $root = document.createElement('div')
//     router = new Router($root, {
//       dashboard: DashboardPage,
//       excel: ExcelPage
//     })
//   })

//   test('should be defined', () => {
//     // expect(router).toBeDefined()
//     expect(router).not.toBeNull()
//   })

//   test('should render Dashboard Page', () => {
//     router.changePageHandler()
//     expect($root.innerHTML).toBe('<div>dashboard</div>')
//   })
// })


import { Router } from './Router';
import { Page } from '../page/Page';

// Создаем страницу для Dashboard
class DashboardPage extends Page {
  // Метод, который возвращает корневой элемент страницы
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}

// Создаем страницу для Excel
class ExcelPage extends Page {}

// Описание тестов для Router
describe('Router:', () => {
  let router;
  let $root;

  // Выполняется перед каждым тестом
  beforeEach(() => {
    $root = document.createElement('div');
    // Создаем экземпляр Router с моковыми страницами dashboard и excel
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });

  // Тест: экземпляр Router должен быть определен
  test('should be defined', () => {
    // Ожидаем, что router не является null
    expect(router).toBeDefined();
  });

  // Тест: должна отрисоваться страница Dashboard
  test('should render Dashboard Page', async () => {
    // Вызываем метод changePageHandler у router
    await router.changePageHandler();
    // Ожидаем, что содержимое $root равно '<div>dashboard</div>'
    expect($root.innerHTML).toBe('<div>dashboard</div>');
  });
});
