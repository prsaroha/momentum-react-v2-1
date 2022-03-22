/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classnames from 'classnames';
import React, { ReactElement, useRef, RefObject, forwardRef } from 'react';

import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

import ButtonSimple from 'components/ButtonSimple';
import Icon from 'components/Icon';
import InputMessage from 'components/InputMessage';
import { useFocusState } from 'hooks/useFocusState';

import { STYLE } from './SearchInput.constants';
import './SearchInput.style.scss';

import type { Props } from './SearchInput.types';

/**
 *  Search input
 */
const SearchInput = (props: Props, ref: RefObject<HTMLInputElement>): ReactElement => {
  const { className, id, style, searching, clearButtonAriaLabel, label, isDisabled } = props;
  const state = useSearchFieldState(props);
  const componentRef = useRef(null);
  const inputRef = ref || componentRef;
  const { focusProps, isFocused } = useFocusState(props);

  const { inputProps, clearButtonProps, labelProps } = useSearchField(props, state, inputRef);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      onClick={handleClick}
      style={style}
      data-disabled={isDisabled}
      data-focus={isFocused}
    >
      {label && (
        <label htmlFor={labelProps.htmlFor} {...labelProps}>
          {label}
        </label>
      )}
      <div>
        <Icon
          weight="light"
          scale={18}
          className={STYLE.search}
          name={searching ? 'spinner' : 'search'}
        />
      </div>
      <div className={STYLE.container}>
        <input {...inputProps} {...focusProps} ref={inputRef} />
      </div>
      {!!state.value && !isDisabled && (
        <ButtonSimple
          className={STYLE.clear}
          {...clearButtonProps}
          aria-label={clearButtonAriaLabel}
        >
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
      <InputMessage />
    </div>
  );
};

const _SearchInput = forwardRef(SearchInput);

_SearchInput.displayName = 'SearchInput';

export default _SearchInput;
