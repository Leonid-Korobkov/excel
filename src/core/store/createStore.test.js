// import { Store } from './createStore'

// const initialState = {
//   count: 0
// }

// const reducer = (state = initialState, action) => {
//   if (action.type === 'ADD') {
//     return { ...state, count: state.count + 1 }
//   }
//   return state
// }

// describe('Store:', () => {
//   let store
//   let handler

//   beforeEach(() => {
//     store = new Store(reducer, initialState)
//     handler = jest.fn()
//   })

//   test('should return store object', () => {
//     expect(store).toBeDefined()
//     expect(store.dispatch).toBeDefined()
//     expect(store.subscribe).toBeDefined()
//     expect(store.getState).not.toBeUndefined()
//   })

//   test('should return object as a state', () => {
//     expect(store.getState()).toBeInstanceOf(Object)
//   })

//   test('should return default state', () => {
//     expect(store.getState()).toEqual(initialState)
//   })

//   test('should change state if action exists', () => {
//     store.dispatch({ type: 'ADD' })
//     expect(store.getState().count).toBe(1)
//   })

//   test("should NOT change state if action don't exists", () => {
//     store.dispatch({ type: 'NOT_EXISTING_ACTION' })
//     expect(store.getState().count).toBe(0)
//   })

//   test('should call subscriber function', () => {
//     store.subscribe(handler)

//     store.dispatch({ type: 'ADD' })

//     expect(handler).toHaveBeenCalled()
//     expect(handler).toHaveBeenCalledWith(store.getState())
//   })

//   test('should NOT call sub if unsubscribe', () => {
//     const sub = store.subscribe(handler)

//     sub.unsubscribe()

//     store.dispatch({ type: 'ADD' })

//     expect(handler).not.toHaveBeenCalled()
//   })

//   test('should dispatch in async way', () => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         store.dispatch({ type: 'ADD' })
//       }, 500)

//       setTimeout(() => {
//         expect(store.getState().count).toBe(1)
//         resolve()
//       }, 1000)
//     })
//   })
// })

// // describe('TEST', () => {
// //   test('test', () => {
// //     expect(1).toBe(1)
// //   })
// // })

// Импортируем класс Store из модуля createStore
import { Store } from './createStore'

// Определяем начальное состояние для тестирования
const initialState = {
  count: 0
}

// Определяем простую функцию редуктора
const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 }
  }
  return state
}

// Описываем блок тестов для класса Store
describe('Store:', () => {
  let store
  let handler

  // Подготовка перед каждым тестом
  beforeEach(() => {
    // Создаем новый экземпляр Store с редуктором и начальным состоянием
    store = new Store(reducer, initialState)
    // Создаем моковую функцию для тестирования подписок
    handler = jest.fn()
  })

  // Тест: должен возвращать объект хранилища
  test('should return store object', () => {
    // Проверки наличия ключевых свойств и методов
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  // Тест: должен возвращать объект в качестве состояния
  test('should return object as a state', () => {
    // Проверка типа состояния, возвращаемого getState
    expect(store.getState()).toBeInstanceOf(Object)
  })

  // Тест: должен возвращать начальное состояние
  test('should return default state', () => {
    // Проверка начального состояния, возвращаемого getState
    expect(store.getState()).toEqual(initialState)
  })

  // Тест: должен изменять состояние при наличии действия
  test('should change state if action exists', () => {
    // Отправляем действие и проверяем обновленное состояние
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  // Тест: НЕ должен изменять состояние, если действие отсутствует
  test("should NOT change state if action don't exists", () => {
    // Отправляем действие, которого нет, и проверяем, что состояние остается неизменным
    store.dispatch({ type: 'NOT_EXISTING_ACTION' })
    expect(store.getState().count).toBe(0)
  })

  // Тест: должен вызывать функцию подписчика
  test('should call subscriber function', () => {
    // Подписываемся на хранилище, отправляем действие и проверяем вызов функции подписчика
    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  // Тест: НЕ должен вызывать подписчик, если отписались
  test('should NOT call sub if unsubscribe', () => {
    // Подписываемся на хранилище, отписываемся, отправляем действие и проверяем, что функция подписчика не вызывается
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({ type: 'ADD' })
    expect(handler).toHaveBeenCalled()
  })

  // Тест: должен отправлять действие асинхронно
  test('should dispatch in async way', () => {
    // Возвращаем Promise, который разрешается после асинхронной отправки
    return new Promise(resolve => {
      // Отправляем действие после задержки
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
      }, 500)

      // Проверяем состояние после более длительной задержки
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})

// Раскомментируйте следующий блок, если хотите протестировать функционал Jest
// describe('TEST', () => {
//   test('test', () => {
//     expect(1).toBe(1)
//   })
// })
