import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './collapse.module.css';

export default function Collapse({ isOpened, children, keepChildren = true }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(isOpened ? 'auto' : '0px');
  const [isClosing, setIsClosing] = useState(false);

  const prevIsOpenedRef = useRef(null);
  useEffect(() => {
    prevIsOpenedRef.current = isOpened;
  });

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (isOpened) {
      // opening case (transitionning from close)
      const $el = ref.current;

      if ($el && prevIsOpenedRef.current !== null) {
        // transition from 0px to the height of the element inner content
        // (the element height is 0px when closed)
        // This is because CSS transition on height doesn't work with `auto`
        const height = $el.scrollHeight;
        setHeight(`${height}px`);

        // in case when user open when it's closing we need to cancel the
        // isClosing transition
        if (isClosing) {
          setIsClosing(false);
        }

        const handleTransitionEnd = e => {
          // remove "height" from the element's inline styles, so it can return to its initial value
          setHeight('auto');
        };
        $el.addEventListener('transitionend', handleTransitionEnd);

        return () => {
          $el.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    } else {
      // closing case (transition from open or from isClosing)
      // we need to track isClosing so that we keep the children arround during
      // the transition time
      const $el = ref.current;
      if ($el && (prevIsOpenedRef.current === true || isClosing)) {
        if (prevIsOpenedRef.current === true) {
          // we prepare the transition by setting the height of the element to
          // the height of its inner content
          const height = $el.scrollHeight;

          const transition = $el.style.transition;
          $el.style.transition = '';
          setHeight(`${height}px`);

          const rafId = requestAnimationFrame(() => {
            $el.style.transition = transition;
            setIsClosing(true);
          });

          return () => {
            cancelAnimationFrame(rafId);
          };
        } else if (isClosing) {
          // the closing transition
          const handleTransitionEnd = e => {
            setIsClosing(false);
          };
          $el.addEventListener('transitionend', handleTransitionEnd);

          // We need to set height to 0 _after_ the browser had time to register
          // the previous setHeight (so on the next animation frame)
          const rafId = requestAnimationFrame(() => {
            setHeight('0px');
          });

          return () => {
            $el.removeEventListener('transitionend', handleTransitionEnd);
            cancelAnimationFrame(rafId);
          };
        }
      }
    }
  }, [isOpened, isClosing]);

  return (
    <div className={styles.collapse} ref={ref} style={{ height }}>
      {keepChildren ||
      isOpened ||
      isClosing ||
      (prevIsOpenedRef.current && !isOpened && !isClosing)
        ? children
        : null}
    </div>
  );
}

Collapse.propTypes = {
  children: PropTypes.any,
  isOpened: PropTypes.bool.isRequired,
  keepChildren: PropTypes.bool
};
