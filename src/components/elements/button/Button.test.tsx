// afterEach(cleanup);
import Button from '@components/elements/button/Button';
import { cleanup, render } from '@helpers/test';

afterEach(cleanup);

it('shoud be loading', () => {
  const { getByTestId } = render(
    <Button as="button" styleType="primary" isLoading={true} children="test" />
  );

  const loader = getByTestId('button-loader');

  expect(loader).toBeInTheDocument();
});
