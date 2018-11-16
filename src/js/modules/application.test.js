import Applicaiton from './application';

const mockFactory = {
  create: jest.fn()
};

const mockRegistry = {
  get: jest.fn((name) => {
    return (name === 'widgets.Widget3')
      ? null
      : {}
  })
};

describe('Application module', () => {
  it('should init widgets on page', () => {
    document.body.innerHTML = `
      <div>
        <div data-module="widgets.Widget1"></div>
        <div data-module="widgets.Widget2"></div>
        <div data-module="widgets.Widget3"></div>
      </div>
    `;

    const app = new Applicaiton(document.body, mockRegistry, mockFactory);
    app.init();

    const createMock = mockFactory.create.mock;
    const getMock = mockRegistry.get.mock;

    expect(createMock.calls.length).toBe(2);

    expect(getMock.calls.length).toBe(3);
    expect(getMock.calls[0][0]).toBe('widgets.Widget1');
    expect(getMock.calls[1][0]).toBe('widgets.Widget2');
  });
});