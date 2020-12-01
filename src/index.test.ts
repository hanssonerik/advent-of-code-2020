const mockApp = jest.fn();
describe("index.ts", () => {
  it("runs without crash", async () => {
    const spyConsole = jest.spyOn(global.console, "debug").mockImplementation();
    jest.mock("./app", () => ({ App: mockApp }));
    mockApp.mockResolvedValue({});

    const index = await import("./index");
    await index.default;

    expect(spyConsole).toBeCalled();
  });
});

export default {};
