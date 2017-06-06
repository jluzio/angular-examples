import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('reverse value', () => {
    const pipe = new ReversePipe();
    expect(pipe.transform("12345")).toBe("54321");
  });
});
