'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import {
  increment,
  decrement,
  incrementByAmount,
} from '../redux/slices/counterSlice';
import ThemeToggle from './components/ThemeToggle';

// import styles from './page.module.css';

export default function Home() {
  // COMMENT HERE
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>This is the home page</h1>
      <ThemeToggle />
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ margin: '0 .5rem' }}
      >
        Decrement
      </button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}
