import React, { FunctionComponent } from 'react';
import { useSwipeable } from 'react-swipeable';
import {
  Wrapper,
  CarouselContainer,
  CarouselSlot,
  SlideButtonContainer,
  SlideButton,
  PREV,
  NEXT
} from '../index';

type Direction = typeof PREV | typeof NEXT;

interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: Direction;
}

type CarouselAction =
  | { type: Direction, numItems: number }
  | { type: 'stopSliding' | 'reset' };

const getOrder = (index: number, pos: number, numItems: number) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const initialState: CarouselState = { pos: 0, sliding: false, dir: NEXT };

const Carousel: FunctionComponent = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const numItems = React.Children.count(props.children);

  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: 'stopSliding' });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(NEXT),
    onSwipedRight: () => slide(PREV),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div {...handlers}>
      <Wrapper>
        <CarouselContainer dir={state.dir} sliding={state.sliding}>
          {React.Children.map(props.children, (child, index) => (
            <CarouselSlot
              key={index}
              order={getOrder(index, state.pos, numItems)}
            >
              {child}
            </CarouselSlot>
          ))}
        </CarouselContainer>
      </Wrapper>


      
      <SlideButtonContainer>
        <SlideButton onClick={() => slide(PREV)} float="left">
          Prev
        </SlideButton>
        <SlideButton onClick={() => slide(NEXT)} float="right">
          Next
        </SlideButton>
      </SlideButtonContainer>
    </div>
  );
};

function reducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'reset':
      return initialState;
    case PREV:
      return {
        ...state,
        dir: PREV,
        sliding: true,
        pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1
      };
    case NEXT:
      return {
        ...state,
        dir: NEXT,
        sliding: true,
        pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1
      };
    case 'stopSliding':
      return { ...state, sliding: false };
    default:
      return state;
  }
}

export default Carousel;
