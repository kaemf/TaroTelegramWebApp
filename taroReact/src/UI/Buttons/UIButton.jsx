import React, { useMemo, useCallback } from 'react';
import AnimationLoad from '../Access/animations/AnimationLoad/AnimationLoad';
import UIIcon from '../UIIcon';
import css from './UIButton.module.css';
import { NavLink } from 'react-router-dom';

function UIButton({
  filled = false,
  nav = "",
  children,
  handleClick,
  fontSize = 14,
  text = "",
  styled = "default",
  outline = false,
  alignPosition = "center",
  width = "100%",
  minWidth = "unset",
  maxWidth = "100%",
  fullPadding = false,
  paddingLeft = "var(--30)",
  paddingRight = "var(--30)",
  paddingBottom = "var(--15)",
  paddingTop = "var(--15)",
  color = "theme",
  loading = false,
  disable = false,
  error = false,
  className,
  active
}) {
  const loadingItem = useMemo(() => {
    if (loading) {
      return (
        <div
          className={`fontSize${fontSize}`}
          style={{
            width: "1.5em",
            height: "1.5em"
          }}
        >
          <UIIcon size="100%">
            <AnimationLoad />
          </UIIcon>
        </div>
      );
    }
    return null;
  }, [loading, fontSize]);

  const style = useMemo(() => {
    let baseStyle = {
      width,
      minWidth,
      maxWidth
    };

    if (fullPadding) {
      baseStyle.padding = fullPadding;
    } else {
      baseStyle = {
        ...baseStyle,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop
      };
    }

    return baseStyle;
  }, [
    width,
    minWidth,
    maxWidth,
    fullPadding,
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingTop
  ]);

  const handleClickMemoized = useCallback(() => {
    if (handleClick && !loading && !disable) {
      handleClick();
    }
  }, [handleClick, loading, disable]);

  return (
    <div
      onClick={handleClickMemoized}
      className={`
        ${css.UIButton}
        UIButton
        ${css[styled]}
        ${css[outline && "outline"]}
        ${css[`position_${alignPosition}`]}
        ${css[error ? "error" : color]}
        ${error ? "error" : color}
        fontSize${fontSize}
        ${active && "active"}
        ${css[loading && "loading"]}
        ${css[disable && 'disable']}
        ${css[active && 'disable']}
        ${nav && css.navButton}
        ${className}
        ${text && css.text}
        ${filled && css.filled}
      `}
      style={style}
    >
      {nav && <NavLink to={nav} className={`${css.nav}`}></NavLink>}
      {loading ? loadingItem : text || children}
    </div>
  );
}

export default React.memo(UIButton);
