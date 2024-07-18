import { TestRunnerConfig, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    // Waits for the page to be ready before taking a screenshot to ensure consistent results
    await waitForPageReady(page);

    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler?.innerHTML();
    expect(innerHTML).toMatchSnapshot();

    // To capture a screenshot for for different browsers, add page.context().browser().browserType().name() to get the browser name to prefix the file name
    const image = await page.screenshot({animations: "disabled"});
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: context.id,
    });
  },
};
export default config;
