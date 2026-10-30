'use strict';

const { RoomStore } = require('../../src/store');
const { validateRoomInput, parsePositiveInt } = require('../../src/validation');

describe('RoomStore', () => {
  test('create присваивает возрастающие идентификаторы', () => {
    const store = new RoomStore();
    const first = store.create({ name: 'A', capacity: 10 });
    const second = store.create({ name: 'B', capacity: 20 });
    expect(first.id).toBe(1);
    expect(second.id).toBe(2);
  });

  test('list фильтрует по вместимости', () => {
    const store = new RoomStore([
      { name: 'small', capacity: 10 },
      { name: 'large', capacity: 100 },
    ]);
    expect(store.list(50)).toHaveLength(1);
    expect(store.list()).toHaveLength(2);
  });

  test('delete возвращает false для несуществующей аудитории', () => {
    const store = new RoomStore();
    expect(store.delete(42)).toBe(false);
  });
});

describe('validation', () => {
  test('validateRoomInput принимает корректные данные', () => {
    expect(validateRoomInput({ name: 'A-1', capacity: 10 })).toBeNull();
  });

  test('validateRoomInput отклоняет пустое имя', () => {
    expect(validateRoomInput({ name: '  ', capacity: 10 })).toMatch(/name/);
  });

  test('validateRoomInput отклоняет вместимость 0', () => {
    expect(validateRoomInput({ name: 'A-1', capacity: 0 })).toMatch(/capacity/);
  });

  test('parsePositiveInt', () => {
    expect(parsePositiveInt('5')).toBe(5);
    expect(parsePositiveInt('0')).toBeNull();
    expect(parsePositiveInt('abc')).toBeNull();
    expect(parsePositiveInt(undefined)).toBeNull();
  });
});
