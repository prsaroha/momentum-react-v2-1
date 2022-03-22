import classNames from 'classnames';
import React, { FC } from 'react';

import { DEFAULTS, STYLE } from './ButtonGroup.constants';
import { Props } from './ButtonGroup.types';
import './ButtonGroup.style.scss';

const ButtonGroup: FC<Props> = (props: Props) => {
  const { children, className, id, round, spaced, compressed, style } = props;

  return (
    <div
      className={classNames(STYLE.wrapper, className)}
      data-round={round || DEFAULTS.ROUND}
      data-spaced={spaced || DEFAULTS.SPACED}
      data-compressed={compressed || DEFAULTS.COMPRESSED}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
