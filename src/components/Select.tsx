import * as React from 'react';
import styled from 'styled-components';
import { Modifier, usePopper } from 'react-popper';
import { StyledComponent } from 'styled-components';
import { flowRight, partialRight, reverse, unionBy } from 'lodash-es';

import {
  DURATION,
  colorBlack100,
  colorBlack50,
  colorGray,
  colorLightGray,
  ESCAPE_KEYCODE,
} from '../constants';

export interface Option {
  label: string;
  value: string;
}

export interface ListProps {
  isHidden: boolean;
  width: string;
}

export const DefaultList = styled.ul<ListProps>`
  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0 12px 40px ${colorBlack100}, 0 0 12px ${colorBlack50};
  transition: opacity ${DURATION}ms ease;
  width: ${({ width }) => width}px;
  pointer-events: all;

  ${({ isHidden }) =>
    isHidden &&
    `
      opacity: 0;
      pointer-events: none;
    `}
`;

export interface ItemProps {
  onClick?: OptionCallback;
}

export const DefaultItem = styled.li<ItemProps>`
  overflow: hidden;
  padding: 8px 20px;
  color: ${colorGray};
  font-size: 14px;
  line-height: 20px;
  transition: background-color ${DURATION}ms ease;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${colorLightGray};
  }
`;

export type OptionCallback = (value: string) => void;

export interface SelectProps {
  Item?: StyledComponent<'li', any, ItemProps>;
  List?: StyledComponent<'ul', any, ListProps>;
  offset?: [number, number];
  options: Option[];
  modifiers?: Partial<Modifier<unknown, object>>[];
  width?: string;
  onOptionClick?: OptionCallback;
}

const composeModifiersByName = flowRight(partialRight(unionBy, 'name'), reverse);

type HTMLDivRef = HTMLDivElement | null | undefined;

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  Item = DefaultItem,
  List = DefaultList,
  children,
  offset = [4, 4],
  options,
  modifiers = [],
  width = '200',
  onOptionClick,
}) => {
  const [isHidden, setIsHidden] = React.useState(true);
  const [popperRef, setPopperRef] = React.useState<HTMLDivRef>(null);
  const [referenceRef, setReferenceRef] = React.useState<HTMLDivRef>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      const target = e.target as Node;

      if (!isHidden && target && !popperRef?.contains(target) && !referenceRef?.contains(target)) {
        setIsHidden(true);
      }
    };

    const handleEscape = (e: KeyboardEvent): void => {
      if (e.keyCode === ESCAPE_KEYCODE) {
        setIsHidden(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isHidden, popperRef, referenceRef]);

  const { attributes, styles } = usePopper(referenceRef, popperRef, {
    placement: 'bottom-start',
    modifiers: composeModifiersByName([
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start', 'bottom-start'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: offset,
        },
      },
      ...modifiers,
    ]),
  });

  const handleOptionClick = (value: string): (() => void) => {
    return () => {
      if (onOptionClick) {
        onOptionClick(value);
      }

      setIsHidden(true);
    };
  };

  const handleToggleClick = (): void => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div ref={setReferenceRef} onClick={handleToggleClick}>
        {children}
      </div>

      <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
        <div style={styles.offset}>
          <List isHidden={isHidden} width={width}>
            {options.map(({ value, label }) => (
              <Item key={label} onClick={handleOptionClick(value)}>
                {label}
              </Item>
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default Select;
