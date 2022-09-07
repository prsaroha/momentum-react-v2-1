import React from 'react';
import { mount } from 'enzyme';

import SecondLineElement from '.';
import { mountAndWait } from '../../../../test/utils';
import DividerDot from '../../DividerDot';

describe('<SecondLineElement />', () => {
  const exampleChildProp = 'example-text';
  const showDividerDot = true;

  describe('snapshot', () => {
    it('should match snapshot with children', () => {
      expect.assertions(1);

      const container = mount(<SecondLineElement>{exampleChildProp}</SecondLineElement>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children and showDividerDot', () => {
      expect.assertions(1);

      const container = mount(
        <SecondLineElement showDividerDot={showDividerDot}>{exampleChildProp}</SecondLineElement>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided children', async () => {
      expect.assertions(1);

      const container = (
        await mountAndWait(<SecondLineElement>{exampleChildProp}</SecondLineElement>)
      )
        .find('[data-test="second-line-element-child"]')
        .getDOMNode();

      expect(container.textContent).toBe(exampleChildProp);
    });

    it('should have provided dot when dot is provided', () => {
      expect.assertions(1);

      const container = mount(
        <SecondLineElement showDividerDot={showDividerDot}>{exampleChildProp}</SecondLineElement>
      ).find(DividerDot);

      expect(
        container.filter("[data-test='multiple-string-second-line-divider-dot']").length
      ).toEqual(1);
    });

    it('should not have provided dot when dot is not provided', () => {
      expect.assertions(1);

      const container = mount(<SecondLineElement>{exampleChildProp}</SecondLineElement>).find(
        DividerDot
      );

      expect(
        container.filter("[data-test='multiple-string-second-line-divider-dot']").length
      ).toEqual(0);
    });
  });
});
