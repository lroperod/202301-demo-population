import dotenv from 'dotenv';
dotenv.config();
import bunyan from 'bunyan';

test('Given a logger', () => {
  bunyan.createLogger = jest.fn();

  bunyan.createLogger({ name: 'DemoApp' });

  expect(bunyan.createLogger).toHaveBeenCalledTimes(1);
});
