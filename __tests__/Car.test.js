/* eslint-disable no-undef */
const IO = require('../src/utils/IO.js');
const Util = require('../src/utils/Util.js');
const App = require('../src/index.js');

const mockQuestions = (answers) => {
  IO.read = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((_, callback) => {
      callback(input);
    });
  }, IO.read);
};

const mockRandoms = (numbers) => {
  Util.randomValue = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, Util.randomValue);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(IO, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('RacingController test', () => {
  test('', () => {
    mockRandoms([5, 3, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3]);
    mockQuestions(['pobi,crong,honux', 5]);
    const logs = [
      '',
      '실행 결과',
      'pobi : -',
      'crong : -',
      'honux : -',
      '',
      'pobi : --',
      'crong : -',
      'honux : --',
      '',
      'pobi : ---',
      'crong : --',
      'honux : ---',
      '',
      'pobi : ----',
      'crong : ---',
      'honux : ----',
      '',
      'pobi : -----',
      'crong : ----',
      'honux : -----',
      '',
      'pobi : -----',
      'crong : ----',
      'honux : -----',
      '',
      'pobi, honux가 최종 우승했습니다.',
    ];

    const logSpy = getLogSpy();
    const app = new App();
    app.init();

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});
